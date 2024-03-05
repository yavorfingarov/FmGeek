import {defineConfig, minimal2023Preset} from "@vite-pwa/assets-generator/config";

export default defineConfig({
    headLinkOptions: {
        preset: "2023"
    },
    preset: {
        ...minimal2023Preset,
        maskable: {
            ...minimal2023Preset.maskable,
            padding: 0,
            resizeOptions: {
                ...minimal2023Preset.maskable.resizeOptions,
                background: {r: 0, g: 0, b: 0, alpha: 0}
            }
        }
    },
    images: ["src/icons/favicon.svg"]
});
