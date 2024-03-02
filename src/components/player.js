import Alpine from "alpinejs";
import {Switch} from "./common/switch";
import {updateHistory} from "./player.history";
import {playbackErrorMessage} from "./common/messages";
import {getStationDisplayName} from "./common/helpers";

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
                    this.$refs.player.pause();
                } else if (this.$store.player.current?.stream) {
                    this.play();
                }
            },
            play() {
                this.$refs.player.pause();
                this.$refs.player.src = this.$store.player.current.stream;
                this.$refs.player.load();
                this.$refs.player.play().catch(() => {});
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
