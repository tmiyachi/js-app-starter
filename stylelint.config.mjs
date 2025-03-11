/**
 * @see https://stylelint.io/user-guide/configure/
 * @type {import('stylelint').Config}
 */
export default {
  ignoreFiles: ['dist/**/*'],
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
  },
};
