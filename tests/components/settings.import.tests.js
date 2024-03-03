import {describe, expect, test} from "vitest";
import {parseStations} from "../../src/components/settings.import";
import {generateStations, generateGroups} from "../common/stations";

describe("parseStations", function () {
    const propertyTestCases = [
        {stationIndex: 0, groupIndex: 2, propertyName: "name", value: null},
        {stationIndex: 3, groupIndex: 2, propertyName: "name", value: ""},
        {stationIndex: 3, groupIndex: 2, propertyName: "name", value: "   "},
        {stationIndex: 3, groupIndex: 2, propertyName: "name", value: 42},
        {stationIndex: 3, groupIndex: 2, propertyName: "name", value: true},
        {stationIndex: 3, groupIndex: 0, propertyName: "name", value: {}},
        {stationIndex: 3, groupIndex: 2, propertyName: "name", value: []},
        {stationIndex: 0, groupIndex: 2, propertyName: "stream", value: null},
        {stationIndex: 3, groupIndex: 2, propertyName: "stream", value: ""},
        {stationIndex: 3, groupIndex: 2, propertyName: "stream", value: "   "},
        {stationIndex: 3, groupIndex: 2, propertyName: "stream", value: 42},
        {stationIndex: 3, groupIndex: 2, propertyName: "stream", value: true},
        {stationIndex: 3, groupIndex: 0, propertyName: "stream", value: {}},
        {stationIndex: 3, groupIndex: 2, propertyName: "stream", value: []},
        {stationIndex: 0, groupIndex: 2, propertyName: "website", value: ""},
        {stationIndex: 3, groupIndex: 2, propertyName: "website", value: "   "},
        {stationIndex: 3, groupIndex: 2, propertyName: "website", value: 42},
        {stationIndex: 3, groupIndex: 2, propertyName: "website", value: true},
        {stationIndex: 3, groupIndex: 0, propertyName: "website", value: {}},
        {stationIndex: 3, groupIndex: 2, propertyName: "website", value: []}
    ];

    const stationTestCases = [
        {stationIndex: 0, groupIndex: 2, value: null},
        {stationIndex: 3, groupIndex: 2, value: ""},
        {stationIndex: 3, groupIndex: 2, value: "   "},
        {stationIndex: 3, groupIndex: 0, value: 42},
        {stationIndex: 3, groupIndex: 2, value: true},
        {stationIndex: 3, groupIndex: 2, value: []}
    ];

    test.each(["", "   ", "{", "undefined", "test"])("throws on invalid JSON (%s)", function (input) {
        expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
    });

    test.each(["null", "{}", "[]"])("throws on invalid root data structure (%s)", function (input) {
        expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
    });

    describe("with grouping", function () {
        test.each(stationTestCases)("throws on invalid groupName ($value)", function (testCase) {
            const groups = generateGroups(5, function (x) {
                x[testCase.groupIndex].groupName = testCase.value;
            });
            const input = JSON.stringify(groups);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test.each(stationTestCases.filter((x) => x.value !== true))(
            "throws on invalid prependToStationName ($value)",
            function (testCase) {
                const groups = generateGroups(5, function (x) {
                    x[testCase.groupIndex].prependToStationName = testCase.value;
                });
                const input = JSON.stringify(groups);
                expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
            }
        );

        test.each(stationTestCases)("throws on invalid stations ($value)", function (testCase) {
            const groups = generateGroups(5, function (x) {
                x[testCase.groupIndex].stations = testCase.value;
            });
            const input = JSON.stringify(groups);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test.each(stationTestCases)("throws on invalid station ($value)", function (testCase) {
            const groups = generateGroups(5, function (x) {
                x[testCase.groupIndex].stations[testCase.stationIndex] = testCase.value;
            });
            const input = JSON.stringify(groups);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test.each(propertyTestCases)("throws on invalid property value ($propertyName = $value)", function (testCase) {
            const groups = generateGroups(5, function (x) {
                x[testCase.groupIndex].stations[testCase.stationIndex][testCase.propertyName] = testCase.value;
            });
            const input = JSON.stringify(groups);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test("throws on unsupported stream", function () {
            const groups = generateGroups(5, function (x) {
                x[2].stations[3].stream = "http://testStream.com";
            });
            const input = JSON.stringify(groups);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test("throws on duplicate station name", function () {
            const stations = [...generateGroups(5), ...generateGroups(1)];
            const input = JSON.stringify(stations);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test("handles valid data", function () {
            const groups = generateGroups(5);
            const input = JSON.stringify(groups);
            const result = parseStations(input);
            expect(result).toStrictEqual(groups);
        });
    });

    describe("without grouping", function () {
        test.each(stationTestCases)("throws on invalid station ($value)", function (testCase) {
            const stations = generateStations(5, function (x) {
                x[testCase.stationIndex] = testCase.value;
            });
            const input = JSON.stringify(stations);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test.each(propertyTestCases)("throws on invalid property value ($propertyName = $value)", function (testCase) {
            const stations = generateStations(5, function (x) {
                x[testCase.stationIndex][testCase.propertyName] = testCase.value;
            });
            const input = JSON.stringify(stations);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test("throws on unsupported stream", function () {
            const stations = generateStations(5, function (x) {
                x[2].stream = "http://testStream.com";
            });
            const input = JSON.stringify(stations);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test("throws on duplicate station name", function () {
            const stations = [...generateStations(5), ...generateStations(1)];
            const input = JSON.stringify(stations);
            expect(() => parseStations(input)).toThrowErrorMatchingSnapshot();
        });

        test("handles valid data", function () {
            const stations = generateStations(5);
            const input = JSON.stringify(stations);
            const result = parseStations(input);
            expect(result).toStrictEqual(stations);
        });
    });
});
