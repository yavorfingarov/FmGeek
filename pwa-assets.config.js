import {defineConfig, minimal2023Preset} from "@vite-pwa/assets-generator/config";

export default defineConfig({
    headLinkOptions: {
        preset: "2023"
    },
    preset: {
        ...minimal2023Preset,
        maskable: {
            sizes: [512],
            padding: 0,
            resizeOptions: {
                background: {r: 0, g: 0, b: 0, alpha: 0}
            }
        }
    },
    images: ["src/icons/favicon.svg"]
});
