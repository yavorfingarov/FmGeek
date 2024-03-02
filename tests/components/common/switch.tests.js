import {describe, expect, test} from "vitest";
import {Switch} from "../../../src/components/common/switch";

describe("Switch", function () {
    test("is empty when no initial value is passed", function () {
        const testSwitch = new Switch("get");
        expect(testSwitch.get).toBeTypeOf("function");
        expect(Object.keys(testSwitch)).toHaveLength(1);
    });

    test("is not empty when initial value is passed", function () {
        const testSwitch = new Switch("get", "test1");
        expect(testSwitch.get).toBeTypeOf("function");
        expect(testSwitch.test1).toBe(true);
        expect(Object.keys(testSwitch)).toHaveLength(2);
    });

    test("is switching", function () {
        const testSwitch = new Switch("get", "test1");
        testSwitch.get("test2");
        testSwitch.get("test3");
        testSwitch.get("test1");
        testSwitch.get("test2");
        expect(testSwitch.get).toBeTypeOf("function");
        expect(testSwitch.test1).toBe(false);
        expect(testSwitch.test2).toBe(true);
        expect(testSwitch.test3).toBe(false);
        expect(Object.keys(testSwitch)).toHaveLength(4);
    });
});
