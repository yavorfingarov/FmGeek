import { describe, expect, test } from "vitest";
import {
    defaultTimeout,
    defaultUiSettings,
    getDefaultStations,
    historyLength
} from "../../src/components/settings.default.js";

test("defaultTimeout", function () {
    expect(defaultTimeout).toBe(120);
});

test("defaultUiSettings", function () {
    expect(defaultUiSettings).toMatchSnapshot();
});

test("historyLength", function () {
    expect(historyLength).toBe(10);
});

describe("defaultStations", function () {
    test("matches snapshot", function () {
        const stations = getDefaultStations(false);
        expect(stations).toMatchSnapshot();
    });

    test("matches Christmas snapshot", function () {
        const stations = getDefaultStations(true);
        expect(stations).toMatchSnapshot();
    });

    test("has no duplicate streams", function () {
        const stations = getDefaultStations(true);
        const streams = stations.flatMap((x) => x.stations.map((xx) => xx.stream));
        const uniqueStreams = new Set(streams);
        expect(uniqueStreams.size).toBe(streams.length);
    });
});
