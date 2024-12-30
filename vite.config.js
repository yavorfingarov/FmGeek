import {VitePWA} from "vite-plugin-pwa";
import injectHTML from "vite-plugin-html-inject";
import {manifest} from "./src/manifest";

/** @type {import('vite').UserConfig} */

export default {
    root: "./src",
    server: {},
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "./"
    },
    plugins: [
        injectHTML(),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                globIgnores: ["**/{pwa,maskable}*.*"],
                globPatterns: ["**/*.{js,css,ico,png,svg}"],
                additionalManifestEntries: [
                    {
                        url: "index.html",
                        revision: Date.now().toString()
                    }
                ]
            },
            manifest
        })
    ],
    test: {
        dir: "./tests",
        include: "**/*.tests.js",
        coverage: {
            reportsDirectory: "../tests/.coverage"
        }
    }
};
