import { describe, expect, test } from "vitest";
import { defaultTimeout, defaultUiSettings, historyLength, defaultStations } from "../../src/components/settings.default";

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
    const inactiveStations = [
        {
            name: "Concertgebouworkest",
            stream: "https://i2.cdn.jetstre.am:8000/sz=RCOLiveWebradio=mp3-192",
            website: "https://www.concertgebouworkest.nl/radio"
        }
    ];
    const inactiveStreams = inactiveStations.map((x) => x.stream);
    const streams = defaultStations.flatMap((x) => x.stations.map((xx) => xx.stream));
    const uniqueStreams = new Set(streams);
    const websites = defaultStations.flatMap((x) => x.stations.map((xx) => xx.website));
    const uniqueWebsites = new Set(websites);
    // const headers = { "User-Agent": "FmGeekTests/1.0" };
    const timeout = 45 * 1000;
    let lastDomain;

    test("matches snapshot", function () {
        expect(defaultStations).toMatchSnapshot();
    });

    test("has no duplicate streams", function () {
        expect(uniqueStreams.size).toBe(streams.length);
    });

    test.each(Array.from(uniqueWebsites))(
        "has valid website (%s)",
        { skip: true, timeout },
        async function (website) {
            const isActive = await isUrlActive(website);
            expect(isActive).toBe(true);
        }
    );

    test.each(Array.from(streams))(
        "has valid stream (%s)",
        { skip: true, timeout },
        async function (stream) {
            if (lastDomain && stream.startsWith(lastDomain) && stream.includes("greenhost")) {
                await sleep(20 * 1000);
            }
            lastDomain = stream.match(/https:\/\/.+?\//)[0];
            const isActive = await isUrlActive(stream);
            expect(isActive).toBe(true);
        }
    );

    test.each(Array.from(inactiveStreams))(
        "has still inactive stream (%s)",
        { skip: true, timeout },
        async function (stream) {
            const isActive = await isUrlActive(stream);
            expect(isActive).toBe(false);
        }
    );

    async function isUrlActive(url) {
        for (let i = 1; i <= 3; i++) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    return true;
                }
            } catch (e) {
                console.log(e);
            }
            await sleep(i * 1000);
        }
        return false;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
