/** @type {import("prettier").Config} */

module.exports = {
    trailingComma: "none",
    endOfLine: "auto",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    bracketSpacing: false,
    printWidth: 120,
    overrides: [
        {
            files: "**/*.yml",
            options: {
                tabWidth: 2
            }
        }
    ]
};
