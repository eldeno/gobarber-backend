module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    'no-useless-constructor': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
