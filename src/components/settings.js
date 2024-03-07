import Alpine from "alpinejs";
import {defaultUiSettings, defaultStations, historyLength, defaultTimeout} from "./settings.default";
import {parseStations} from "./settings.import";
import {
    saveConfirmMessage,
    copyErrorMessage,
    discardChangesConfirmMessage,
    resetConfirmMessage
} from "./common/messages";

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
                this.jsonDirty = false;
                this.error = null;
            },
            timeout: this.$persist(defaultTimeout),
            timer: null,
            minutesLeft: null,
            checkInput(element) {
                const value = element._x_model.get();
                if (element.min && (!value || value < element.min)) {
                    element._x_model.set(Number(element.min));
                } else if (element.max && value > element.max) {
                    element._x_model.set(Number(element.max));
                } else if (value % 1 !== 0) {
                    element._x_model.set(Math.floor(value));
                }
            },
            toggleTimer() {
                if (this.timer) {
                    this.stopTimer();
                } else if (this.timeout > 0) {
                    this.minutesLeft = this.timeout;
                    this.timer = setInterval(() => this.tick(), 60 * 1000);
                }
            },
            tick() {
                this.minutesLeft--;
                if (this.minutesLeft === 0) {
                    this.stopTimer();
                    this.$dispatch("timer-stop");
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
                    this.init();
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
                    history.scrollRestoration = "manual";
                    location.reload();
                }
            }
        };
    });
}
