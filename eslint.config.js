const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const jest = require("eslint-plugin-jest");
const licenseHeader = require("eslint-plugin-license-header");
const unusedImports = require("eslint-plugin-unused-imports");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        "ecmaVersion": 12,
        "sourceType": "module",

        parserOptions: {
            "project": ["./tsconfig.json", "./__tests__/test-tsconfig.json"],
        },
    },

    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        jest,
        "license-header": licenseHeader,
        "unused-imports": unusedImports,
    },

    "rules": {
        "comma-dangle": ["warn", "only-multiline"],
        "indent": ["warn", 4],
        "license-header/header": ["error", "LICENSE_HEADER"],
        "max-len": ["warn", 150],
        "no-console": "error",
        "no-multiple-empty-lines": "warn",
        "no-trailing-spaces": "warn",
        "semi": "warn",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",

        "@typescript-eslint/no-magic-numbers": ["warn", {
            "ignore": [-1, 0, 1, 2],
            "ignoreDefaultValues": true,
            "ignoreReadonlyClassProperties": true,
        }],

        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-var-requires": "off",
        "license-header/header": ["error", "./LICENSE_HEADER"],
        "unused-imports/no-unused-imports": "warn",

        "unused-imports/no-unused-vars": ["warn", {
            "args": "none",
        }],
    },
}, globalIgnores(["**/*.js", "**/*.d.ts"]), {
    extends: compat.extends("plugin:jest/recommended"),
    files: ["**/__tests__/**/*.ts"],

    "rules": {
        "@typescript-eslint/no-magic-numbers": "off",

        "jest/expect-expect": ["warn", {
            "assertFunctionNames": ["expect*", "**.*expect*"],
        }],

        "jest/no-conditional-expect": "off",
        "jest/no-standalone-expect": "off",
        "jest/no-try-expect": "off",
        "unused-imports/no-unused-vars": "off",
    },
}]);
