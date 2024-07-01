/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  env: {
    browser: true,
    es2023: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'plugin:@typescript-eslint/stylistic',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'playwright'
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "no-empty": "off",
    "playwright/no-networkidle": "off",
    "no-case-declarations": "off",
    "@typescript-eslint/no-explicit-any": "off",
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'off',
    'max-len': 'off',
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js'],
    },
  ],
});
