module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: 'babel-eslint', // Use babel-eslint as the parser
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        // Add any specific rules you want to enforce
    },
};
