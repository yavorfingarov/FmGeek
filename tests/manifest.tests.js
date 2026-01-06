import { expect, test } from "vitest";
import { manifest } from "../src/manifest.js";

test("snapshot", function () {
    expect(manifest).toMatchSnapshot();
});
