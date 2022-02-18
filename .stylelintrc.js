module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  overrides: [
    // additional configuration to validate scss with vscode-stylelint extension
    // https://github.com/stylelint/vscode-stylelint#%EF%B8%8F-only-css-and-postcss-are-validated-by-default
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
