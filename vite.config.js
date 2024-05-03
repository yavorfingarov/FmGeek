import {resolve} from "path";
import handlebars from "vite-plugin-handlebars";
import {VitePWA} from "vite-plugin-pwa";
import liveReload from "vite-plugin-live-reload";
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
        handlebars({
            partialDirectory: resolve(__dirname, "./src/components")
        }),
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
        }),
        liveReload(".", {alwaysReload: true})
    ]
};
