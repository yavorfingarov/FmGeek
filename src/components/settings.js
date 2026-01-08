import Alpine from "alpinejs";
import { defaultTimeout, defaultUiSettings, getDefaultStations, historyLength } from "./settings.default.js";
import { parseStations } from "./settings.import.js";
import {
    copyErrorMessage,
    discardChangesConfirmMessage,
    resetConfirmMessage,
    saveConfirmMessage
} from "./common/messages.js";

export function settings() {
    Alpine.store("settings", {
        init() {
            const now = new Date();
            const month = now.getMonth() + 1;
            const christmas = month === 12 || month === 1;
            this.defaultStations = getDefaultStations(christmas);
        },
        stations: null,
        defaultStations: null,
        historyLength,
        ui: Alpine.$persist(defaultUiSettings)
    });

    Alpine.data("settings", function () {
        return {
            init() {
                this.loadStations();
                this.loadJson(this.stations, false);
            },
            timeout: this.$persist(defaultTimeout),
            timer: null,
            minutesLeft: null,
            source: this.$persist("default"),
            stations: this.$persist(this.$store.settings.defaultStations),
            json: null,
            jsonDirty: false,
            error: null,
            loadStations() {
                this.$store.settings.stations = (this.source === "default")
                    ? this.$store.settings.defaultStations
                    : this.stations;
            },
            loadJson(stations, jsonDirty) {
                this.json = JSON.stringify(stations, null, 2);
                this.jsonDirty = jsonDirty;
                this.error = null;
            },
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
                    this.stations = stations;
                    this.$store.settings.stations = stations;
                    this.loadJson(this.stations, false);
                }
            },
            copy() {
                navigator.clipboard.writeText(this.json).catch(() => {
                    this.error = copyErrorMessage;
                });
            },
            discardChanges() {
                if (confirm(discardChangesConfirmMessage)) {
                    this.loadJson(this.stations, false);
                }
            },
            loadDefault() {
                this.loadJson(this.$store.settings.defaultStations, true);
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
