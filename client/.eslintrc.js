module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'airbnb',
    // 'airbnb/hooks',
    // 'airbnb-typescript',
    // 'plugin:prettier/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: ['./tsconfig.json'],
    // ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint', "react-hooks"],
  settings: {
    react: {
      version: 'detect'
    }
  },
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'], // Your TypeScript files extension
  //
  //     // As mentioned in the comments, you should extend TypeScript plugins here,
  //     // instead of extending them outside the `overrides`.
  //     // If you don't want to extend any rules, you don't need an `extends` attribute.
  //     extends: [
  //       'plugin:@typescript-eslint/recommended',
  //       'plugin:@typescript-eslint/recommended-requiring-type-checking',
  //     ],
  //
  //     parserOptions: {
  //       project: ['./tsconfig.json'], // Specify it only for TypeScript files
  //     },
  //   },
  // ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'import/prefer-default-export': 'off',
    'no-var': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prefer-destructuring': 'off'
  }
};
