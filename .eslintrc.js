module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true,
    },
    extends: [
        'eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'standard-with-typescript',
    ],
    overrides: [],
    parser: '@typescript-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true,
        },
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier', '@typescript-eslint', '@typescript-eslint/tslint', 'react-hooks'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'prettier/prettier': 0,
        // '@typescript-eslint/ban-ts-ignore': 0,
        // '@typescript-eslint/ban-ts-comment': 0,
        // '@typescript-eslint/camelcase': 0,
        // '@typescript-eslint/no-namespace': 2,
        // '@typescript-eslint/no-use-before-define': 0,
    },
};
