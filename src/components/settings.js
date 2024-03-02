import Alpine from "alpinejs";
import {defaultUiSettings, defaultStations, historyLength, defaultTimeout} from "./settings.default";
import {parseStations} from "./settings.import";
import {
    saveConfirmMessage,
    copyErrorMessage,
    discardChangesConfirmMessage,
    resetConfirmMessage
} from "./common/messages";
import {convertTime} from "./common/helpers";

export function settings() {
    Alpine.store("settings", {
        stations: Alpine.$persist(defaultStations),
        historyLength,
        ui: Alpine.$persist(defaultUiSettings)
    });

    Alpine.data("settings", function () {
        return {
            init() {
                this.json = JSON.stringify(this.$store.settings.stations, null, 2);
                this.error = null;
            },
            timeout: this.$persist(defaultTimeout),
            timer: null,
            timeLeft: null,
            toggleTimer() {
                if (this.timer) {
                    this.stopTimer();
                } else if (this.timeout !== "00:00") {
                    this.timeLeft = this.timeout;
                    this.timer = setInterval(() => this.tick(), 60 * 1000);
                }
            },
            tick() {
                const minutesLeft = convertTime(this.timeLeft) - 1;
                if (minutesLeft === 0) {
                    this.stopTimer();
                    this.$dispatch("timer-stop");
                } else {
                    this.timeLeft = convertTime(minutesLeft);
                }
            },
            stopTimer() {
                clearInterval(this.timer);
                this.timer = null;
            },
            save() {
                let stations;
                try {
                    stations = parseStations(this.json);
                    this.error = null;
                } catch (error) {
                    this.error = error.message;
                    return;
                }
                if (confirm(saveConfirmMessage)) {
                    this.$store.settings.stations = stations;
                }
            },
            copy() {
                navigator.clipboard.writeText(this.json).catch(() => {
                    this.error = copyErrorMessage;
                });
            },
            discardChanges() {
                if (confirm(discardChangesConfirmMessage)) {
                    this.init();
                }
            },
            reset() {
                if (confirm(resetConfirmMessage)) {
                    localStorage.clear();
                    location.reload();
                }
            }
        };
    });
}
