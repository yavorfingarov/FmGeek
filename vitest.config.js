import {defineConfig} from "vite";

/// <reference types="vitest" />

export default defineConfig({
    test: {
        root: "./",
        dir: "./tests",
        include: "**/*.tests.js",
        coverage: {
            reportsDirectory: "./tests/.coverage"
        }
    }
});
