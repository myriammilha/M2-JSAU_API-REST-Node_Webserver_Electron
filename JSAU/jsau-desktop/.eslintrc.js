module.exports = {
    root: true,
    extends: 'usecases/usecase/nodejs',
    env: {
        jest: true,
        node: true,
        browser: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        strict: ['error', 'global'],
        'no-undef': 'error',
        'no-unused-vars': ['warn', {args: 'none'}],
        semi: ['error', 'always'],
    },
};
