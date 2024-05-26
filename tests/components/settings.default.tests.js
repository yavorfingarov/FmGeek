import {describe, expect, test} from "vitest";
import process from "node:process";
import {defaultTimeout, defaultUiSettings, historyLength, defaultStations} from "../../src/components/settings.default";

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
    const streams = defaultStations.flatMap((x) => x.stations.map((xx) => xx.stream));
    const uniqueStreams = new Set(streams);
    const websites = defaultStations.flatMap((x) => x.stations.map((xx) => xx.website));
    const uniqueWebsites = new Set(websites);

    test("matches snapshot", function () {
        expect(defaultStations).toMatchSnapshot();
    });

    test("has no duplicate streams", function () {
        expect(uniqueStreams.size).toBe(streams.length);
    });

    test.each(Array.from(uniqueWebsites))(
        "has valid website (%s)",
        async function (website) {
            const response = await fetch(website);
            expect(response.ok).toBe(true);
        },
        10 * 1000
    );

    test.each(Array.from(streams))(
        "has valid stream (%s)",
        async function (stream) {
            if (stream === "https://a2.vizitec.com:8001/classica.mp3") {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
            } else if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === 0) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
            }
            const response = await fetch(stream);
            expect(response.ok).toBe(true);
        },
        10 * 1000
    );
});
