module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
  overrides: [
    {
      files: ['__tests__/**/*.*'],
      env: {
        jest: true,
      },
    },
  ],
};
