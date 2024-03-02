module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["standard", "prettier"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    ignorePatterns: ["node_modules/*", "dist/*"],
    rules: {
        "no-console": "warn",
        "no-debugger": "warn"
    }
};
