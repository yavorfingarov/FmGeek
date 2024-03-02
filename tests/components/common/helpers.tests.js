import {describe, expect, test} from "vitest";
import {convertTime, getStationDisplayName} from "../../../src/components/common/helpers";

describe("getStationDisplayName", function () {
    test("no groupName", function () {
        const result = getStationDisplayName(null, "TestStation");
        expect(result).toBe("TestStation");
    });

    test("with groupName", function () {
        const result = getStationDisplayName("TestGroup", "TestStation");
        expect(result).toBe("TestGroup TestStation");
    });
});

describe("convertTime", function () {
    const testCases = [
        {timeString: "00:00", minutes: 0},
        {timeString: "00:01", minutes: 1},
        {timeString: "01:00", minutes: 60},
        {timeString: "02:30", minutes: 150},
        {timeString: "10:02", minutes: 602}
    ];

    test.each(testCases)("converts string ($timeString)", function (testCase) {
        const result = convertTime(testCase.timeString);
        expect(result).toBe(testCase.minutes);
    });

    test.each(testCases)("converts number ($minutes)", function (testCase) {
        const result = convertTime(testCase.minutes);
        expect(result).toBe(testCase.timeString);
    });
});
