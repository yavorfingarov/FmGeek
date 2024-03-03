import Alpine from "alpinejs";
import {Switch} from "./common/switch";
import {updateHistory} from "./player.history";
import {playbackErrorMessage} from "./common/messages";
import {getStationDisplayName} from "./common/helpers";
import Hls from "hls.js";

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
            error: null,
            updateRecent() {
                this.recent = this.history.slice(0, this.$store.settings.ui.recentCount);
            },
            selectStation(station, groupName) {
                if (groupName) {
                    station = {...station, name: getStationDisplayName(groupName, station.name)};
                }
                this.history = updateHistory(
                    this.history,
                    this.$store.settings.historyLength,
                    station,
                    this.$store.player.current
                );
                this.$store.player.current = station;
                this.play();
            },
            togglePlay() {
                if (this.status.playing) {
                    this.pause();
                } else if (this.$store.player.current?.stream) {
                    this.play();
                }
            },
            play() {
                this.pause();
                if (this.$store.player.current.stream.endsWith(".m3u8")) {
                    this.loadHls();
                } else {
                    this.load();
                }
                this.$refs.player.play().catch(() => {});
            },
            pause() {
                this.$refs.player.pause();
                if (this.hls) {
                    this.hls.destroy();
                    this.hls = null;
                }
                this.status.set("stopped");
            },
            load() {
                this.$refs.player.src = this.$store.player.current.stream;
                this.$refs.player.load();
            },
            loadHls() {
                if (this.$refs.player.canPlayType("application/vnd.apple.mpegurl") || !Hls.isSupported()) {
                    this.load();
                    return;
                }
                this.hls = new Hls();
                this.hls.on(Hls.Events.ERROR, (_, error) => {
                    if (error.fatal) {
                        this.onError();
                    } else {
                        this.onLoading();
                    }
                });
                this.hls.loadSource(this.$store.player.current.stream);
                this.hls.attachMedia(this.$refs.player);
            },
            onLoading() {
                this.status.set("loading");
            },
            onPlaying() {
                this.status.set("playing");
                this.error = null;
            },
            onError() {
                this.status.set("stopped");
                this.error = playbackErrorMessage;
            }
        };
    });
}
