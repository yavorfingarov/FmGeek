import {expect, test} from "vitest";
import {manifest} from "../src/manifest";

test("snapshot", function () {
    expect(manifest).toMatchSnapshot();
});
