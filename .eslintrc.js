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
        "plugin:prettier/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
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
    },
}
