export const manifest = {
    name: "FmGeek",
    short_name: "FmGeek",
    description: "Listen to your favorite radio stations!",
    start_url: "/",
    display: "standalone",
    theme_color: "#0d47a1",
    background_color: "#0d47a1",
    icons: [
        {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
        },
        {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
        },
        {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
        },
        {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
        }
    ]
};
