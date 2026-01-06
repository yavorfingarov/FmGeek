/// <reference types="vitest/config" />

import { VitePWA } from "vite-plugin-pwa";
import { minimal2023Preset } from "@vite-pwa/assets-generator/config";
import injectHTML from "vite-plugin-html-inject";
import { manifest } from "./src/manifest.js";

/** @type {import('vite').UserConfig} */

export default {
    root: "./src",
    cacheDir: "../node_modules/.vite",
    server: {},
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "./",
        chunkSizeWarningLimit: 600,
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
                dontCacheBustURLsMatching: /\.[a-z0-9]{8}\.[a-z0-9]{2,}$/
            },
            manifest,
            pwaAssets: {
                injectThemeColor: false,
                headLinkOptions: {
                    preset: "2023"
                },
                preset: {
                    ...minimal2023Preset,
                    maskable: {
                        sizes: [512],
                        resizeOptions: {
                            background: manifest.background_color
                        }
                    }
                }
            }
        })
    ],
    test: {
        dir: "./tests",
        include: "**/*.tests.js"
    }
};
