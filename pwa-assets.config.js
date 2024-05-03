import {defineConfig, minimal2023Preset} from "@vite-pwa/assets-generator/config";
import {manifest} from "./src/manifest";

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
                background: manifest.background_color
            }
        }
    },
    images: ["src/icons/favicon.svg"]
});
