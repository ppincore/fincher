module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'unused-imports',
    'feature-sliced',
    'react-component-name',
  ],
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:i18next/recommended',
    'plugin:react-component-name/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off',
    //
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'react-component-name/react-component-name': [
      'error',
      {
        targets: ['memo', 'forwardRef', 'observer'],
      },
    ],
    //
    'feature-sliced/path-checker': ['error', { alias: '@' }],
    'no-use-before-define': ['error', 'nofunc'],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': [
      'warn',
      {
        html: 'ignore',
        exceptions: ['Flex', 'Link', 'Svg'],
      },
    ],
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.config.ts',
          '**/*.{test,stories}.{ts,tsx}',
          '**/{tests,stories,config}/**/*.{ts,tsx}',
          '**/scripts/**/*.{ts,tsx}',
        ],
      },
    ],
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'to',
          'as',
          'name',
          'data-testid',
          'target',
          'direction',
          'justify',
          'align',
          'gap',
          'border',
        ],
      },
    ],
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 120,
      },
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': 'error',
    'jsx-a11y/no-static-element-interactions': 'off', // TODO: handle it later
    'jsx-a11y/click-events-have-key-events': 'off', // TODO: handle it later
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'no-param-reassign': [
      'error',
      { ignorePropertyModificationsForRegex: ['state'] },
    ], // "props": true,
    'jsx-a11y/label-has-associated-control': ['error', {}],
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
  },
  globals: {
    __IS_DEV__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-console': 'off',
      },
    },
  ],
};
