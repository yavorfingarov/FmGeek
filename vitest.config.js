import {defineConfig} from "vite";

/// <reference types="vitest" />

export default defineConfig({
    test: {
        root: "./src",
        dir: "./tests",
        include: "**/*.tests.js",
        coverage: {
            reportsDirectory: "../tests/.coverage"
        }
    }
});
