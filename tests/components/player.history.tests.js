import {describe, expect, test} from "vitest";
import {generateStations} from "../common/stations";
import {updateHistory} from "../../src/components/player.history";

describe("updateHistory", function () {
    const historyLength = 10;
    const current = {
        name: "currentName",
        stream: "currentStream",
        website: "currentWebsite"
    };
    const selected = {
        name: "selectedName",
        stream: "selectedStream",
        website: "selectedWebsite"
    };

    test("handles current null", function () {
        const history = generateStations(historyLength);
        const result = updateHistory(history, historyLength, selected, null);
        expect(result).toBe(history);
    });

    test("handles selected matching current", function () {
        const history = generateStations(historyLength);
        const result = updateHistory(history, historyLength, selected, {name: "selectedName"});
        expect(result).toBe(history);
    });

    test("handles empty history", function () {
        const history = [];
        const result = updateHistory(history, historyLength, selected, current);
        expect(result).not.toBe(history);
        expect(result).toStrictEqual([current]);
    });

    test("handles non-empty history", function () {
        const history = generateStations(historyLength / 2);
        const result = updateHistory(history, historyLength, selected, current);
        expect(result).not.toBe(history);
        expect(result).toStrictEqual([current, ...history]);
    });

    test("handles full history", function () {
        const history = generateStations(historyLength);
        const result = updateHistory(history, historyLength, selected, current);
        expect(result).not.toBe(history);
        expect(result).toStrictEqual([current, ...history.slice(0, history.length - 1)]);
    });

    test("handles when selected is in history", function () {
        const history = [...generateStations(historyLength / 2), selected];
        const result = updateHistory(history, historyLength, selected, current);
        expect(result).not.toBe(history);
        expect(result).toStrictEqual([current, ...generateStations(historyLength / 2)]);
    });

    test("handles when current is in history", function () {
        const history = [...generateStations(historyLength / 2), current];
        const result = updateHistory(history, historyLength, selected, current);
        expect(result).not.toBe(history);
        expect(result).toStrictEqual([current, ...generateStations(historyLength / 2)]);
    });

    test("handles when selected and current are in history", function () {
        const history = [...generateStations(historyLength / 2), current, selected];
        const result = updateHistory(history, historyLength, selected, current);
        expect(result).not.toBe(history);
        expect(result).toStrictEqual([current, ...generateStations(historyLength / 2)]);
    });
});
