/* eslint-disable no-undef */

const ruleState = {
  error: 2,
  warn: 1,
  off: 0,
};
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-empty-interface': ruleState.off,
    '@typescript-eslint/no-explicit-any': ruleState.off,
    'react/prop-types': ruleState.off,
    'sort-imports': ruleState.warn,
    'no-console': ruleState.warn,
    },
  env: {
    "browser": true,
    "node": true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
