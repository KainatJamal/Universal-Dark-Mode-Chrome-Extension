module.exports = {
    parser: '@babel/eslint-parser',
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true, // Add Jest environment
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    globals: {
        chrome: 'readonly',
        test: 'readonly', // Add Jest globals
        expect: 'readonly', // Add Jest globals
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        requireConfigFile: false,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/react-in-jsx-scope': 'off', // Disable the rule if using React 17+
        // Add any other custom rules here
    },
};
