import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends(
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended',
        '@vue/eslint-config-prettier'
    ),
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
        },
    },
    {
        plugins: {
            vue,
            prettier,
            unicorn,
        },
        rules: {
            'prettier/prettier': 'error',
            'unicorn/number-literal-case': [
                'error',
                {
                    hexadecimal: 'uppercase',
                },
            ],
        },
    },
];
