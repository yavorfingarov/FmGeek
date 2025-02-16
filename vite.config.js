import {VitePWA} from "vite-plugin-pwa";
import injectHTML from "vite-plugin-html-inject";
import {createHash} from "crypto";
import {readFileSync} from "fs";
import {manifest} from "./src/manifest";

/** @type {import('vite').UserConfig} */

export default {
    root: "./src",
    server: {},
    build: {
        outDir: "../output",
        emptyOutDir: true,
        assetsDir: "./",
        rollupOptions: {
            output: {
                entryFileNames: "[name].[hash].js",
                chunkFileNames: "[name].[hash].js",
                assetFileNames: "[name].[hash][extname]",
                hashCharacters: "base36"
            }
        }
    },
    plugins: [
        injectHTML(),
        VitePWA({
            registerType: "autoUpdate",
            includeManifestIcons: false,
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ["**/*.{html,js,css,ico,png,svg}"],
                manifestTransforms: [
                    (entries) => {
                        return {
                            manifest: entries.map(transformManifestEntry)
                        };
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

function transformManifestEntry(manifestEntry) {
    if (!manifestEntry.url.match(/\.[a-z0-9]{8}\.[a-z0-9]{2,}$/)) {
        const hash = createHash("MD5");
        const file = readFileSync(`output/${manifestEntry.url}`);
        hash.update(file);
        manifestEntry.revision = hash.digest("hex");
    }
    return manifestEntry;
}
