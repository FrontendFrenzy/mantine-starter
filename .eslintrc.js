module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'import/export': 'off',
    'no-restricted-exports': 'off',
  },
};
