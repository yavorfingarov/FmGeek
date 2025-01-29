import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        languageOptions: {globals: globals.browser}
    },
    pluginJs.configs.recommended,
    eslintConfigPrettier,
    {
        ignores: ["output/*", "tests/.coverage/*"]
    },
    {
        rules: {
            "no-console": "warn",
            "no-debugger": "warn"
        }
    }
];
