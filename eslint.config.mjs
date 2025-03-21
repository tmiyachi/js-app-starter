import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

/**
 * @see https://eslint.org/docs/latest/use/configure/
 */
export default defineConfig([
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['dist/**/*'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es6,
      },
    },
    rules: {
      'consistent-return': 'error',
      'no-sequences': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
]);
