/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  globals: {
    NodeJS: true,
  },
  plugins: ['import'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  settings: {
    'import/resolver': [
      {
        vite: {
          configPath: './vite.config.ts',
        },
      },
      'typescript',
    ],
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
