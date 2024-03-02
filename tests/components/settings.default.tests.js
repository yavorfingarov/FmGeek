import {describe, expect, test} from "vitest";
import {defaultUiSettings, historyLength, defaultStations, defaultTimeout} from "../../src/components/settings.default";

test("defaultTimeout", function () {
    expect(defaultTimeout).toBe("02:00");
});

test("defaultUiSettings", function () {
    expect(defaultUiSettings).toMatchSnapshot();
});

test("historyLength", function () {
    expect(historyLength).toBe(10);
});

describe("defaultStations", function () {
    test("matches snapshot", function () {
        expect(defaultStations).toMatchSnapshot();
    });

    test("has no duplicate streams", function () {
        const streams = defaultStations.flatMap((x) => x.stations.map((xx) => xx.stream));
        const uniqueStreams = new Set(streams);
        expect(uniqueStreams.size).toBe(streams.length);
    });
});
