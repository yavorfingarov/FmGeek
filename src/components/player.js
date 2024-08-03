import Alpine from "alpinejs";
import {Switch} from "./common/switch";
import {updateHistory} from "./player.history";
import {playbackErrorMessage, hlsNotSupportedErrorMessage} from "./common/messages";
import {getStationDisplayName} from "./common/helpers";

const retryTimeout = 10000;
const togglePlayTimeout = 5000;

let Hls = null;

export function player() {
    Alpine.store("player", {
        current: Alpine.$persist(null)
    });

    Alpine.data("player", function () {
        return {
            init() {
                this.updateRecent();
                this.$watch("history", () => this.updateRecent());
                this.$watch("$store.settings.ui.recentCount", () => this.updateRecent());
            },
            hls: null,
            history: this.$persist([]),
            recent: [],
            status: new Switch("set", "stopped"),
            togglePlayEnabled: true,
            retryTimer: null,
            overridePlayEvent: true,
            error: null,
            updateRecent() {
                this.recent = this.history.slice(0, this.$store.settings.ui.recentCount);
            },
            selectStation(station, groupName) {
                station = {
                    ...station,
                    name: getStationDisplayName(groupName, station.name)
                };
                this.history = updateHistory(
                    this.history,
                    this.$store.settings.historyLength,
                    station,
                    this.$store.player.current
                );
                this.$store.player.current = station;
                this.stopRetryTimer();
                this.play();
            },
            togglePlay() {
                this.stopRetryTimer();
                if (this.status.playing) {
                    this.stop();
                } else if (this.togglePlayEnabled) {
                    this.play();
                    this.togglePlayEnabled = false;
                    setTimeout(() => (this.togglePlayEnabled = true), togglePlayTimeout);
                }
            },
            play() {
                if (!this.$store.player.current?.stream) {
                    return;
                }
                this.stop();
                this.load()
                    .then(() => {
                        this.overridePlayEvent = false;
                        this.$refs.player.play().catch(() => {});
                    })
                    .catch((error) => {
                        this.error = error.message;
                    });
            },
            stop() {
                this.$refs.player.pause();
                if (!this.retryTimer) {
                    this.status.set("stopped");
                }
            },
            async load() {
                if (this.$store.player.current.stream.endsWith(".m3u8")) {
                    await this.importHls();
                    if (this.hls) {
                        this.hls.destroy();
                    }
                    this.hls = new Hls();
                    this.hls.on(Hls.Events.ERROR, (_, error) => this.onHlsError(error));
                    this.hls.loadSource(this.$store.player.current.stream);
                    this.hls.attachMedia(this.$refs.player);
                } else {
                    this.$refs.player.src = this.$store.player.current.stream;
                    this.$refs.player.load();
                }
            },
            async importHls() {
                try {
                    if (!Hls) {
                        const hlsModule = await import("hls.js");
                        Hls = hlsModule.Hls;
                    }
                } catch {
                    throw Error(playbackErrorMessage);
                }
                if (!Hls.isSupported()) {
                    throw Error(hlsNotSupportedErrorMessage);
                }
            },
            stopRetryTimer() {
                if (this.retryTimer) {
                    clearInterval(this.retryTimer);
                    this.retryTimer = null;
                }
            },
            onPlay() {
                this.status.set("loading");
                if (this.overridePlayEvent) {
                    this.play();
                }
                this.overridePlayEvent = true;
            },
            onPlaying() {
                this.status.set("playing");
                this.stopRetryTimer();
                this.error = null;
                this.togglePlayEnabled = true;
            },
            onStalled() {
                this.status.set("loading");
                if (!this.retryTimer) {
                    this.retryTimer = setInterval(() => this.play(), retryTimeout);
                }
            },
            onError() {
                this.stop();
                this.togglePlayEnabled = true;
                if (!this.retryTimer) {
                    this.error = playbackErrorMessage;
                }
            },
            onHlsError(error) {
                if (!error.fatal || this.retryTimer) {
                    return;
                }
                if (this.status.playing && error.type === Hls.ErrorTypes.NETWORK_ERROR) {
                    this.onStalled();
                } else {
                    this.onError();
                }
            }
        };
    });
}
