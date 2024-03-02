const tsEslintConfig = require('./tsconfig.eslint.json');

module.exports = {
  root: true,
  ignorePatterns: tsEslintConfig.exclude,
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  extends: ['eslint-config-tidgi'],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
  },
};
