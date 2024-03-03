import {describe, expect, test} from "vitest";
import {getStationDisplayName} from "../../../src/components/common/helpers";

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
