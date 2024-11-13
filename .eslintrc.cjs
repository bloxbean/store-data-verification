/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: {
    browser: true,
    es2023: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:playwright/recommended",
    "plugin:@typescript-eslint/stylistic",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "playwright"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "no-empty": "off",
    "playwright/no-networkidle": "off",
    "no-case-declarations": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-console": "off",
    "max-len": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/consistent-generic-constructors": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "playwright/missing-playwright-await": "off",
    "playwright/no-nested-step": "off",
    "prefer-const": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "playwright/valid-expect": "warn",
    "no-undef": "warn",
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.js"],
    },
  ],
});
