module.exports = {
    env: {
        // ESLint should be aware of Node.js global variables and scoping
        commonjs: true,
        // ESLint should be aware of ES2021 global variables and the ES2021 syntax
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:typescript-sort-keys/recommended",
        "plugin:jsdoc/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        project: "./tsconfig.eslint.json",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "linebreak-style": ["error", "unix"],
        "prettier/prettier": "error",
        "sort-keys": [
            "error",
            "asc",
            { caseSensitive: true, minKeys: 2, natural: true },
        ],
        // Sort imports
        "sort-imports": [
            "error",
            {
                ignoreCase: true,
                allowSeparatedGroups: true,
            },
        ],
        // Custom JSDoc settings
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "jsdoc/check-param-names": "error",
        "jsdoc/check-tag-names": [
            "error",
            {
                definedTags: ["typeParam"],
            },
        ],
        "jsdoc/no-types": "error",
        "jsdoc/no-defaults": "error",
        "jsdoc/check-indentation": "error",
        "jsdoc/check-line-alignment": "error",
    },
}
