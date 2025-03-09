import vue from 'eslint-plugin-vue'
import unicorn from 'eslint-plugin-unicorn'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import ts from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import { includeIgnoreFile } from '@eslint/compat'
import stylistic from '@stylistic/eslint-plugin'
import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from '@vue/eslint-config-typescript'

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    compat = new FlatCompat({ baseDirectory: __dirname })

const gitignorePath = path.resolve(__dirname, '.gitignore')

export default defineConfigWithVueTs(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    js.configs.all,
    ...ts.configs.recommended,
    prettierRecommended,
    {
        plugins: {
            '@stylistic': stylistic,
        },
    },
    unicorn.configs.recommended,
    vue.configs['flat/essential'],
    vueTsConfigs.recommendedTypeChecked,
    ...compat.extends(),
    eslintConfigPrettier,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2020,
                ...globals.es2021,
                ...globals.amd,
            },
            sourceType: 'module',
            parserOptions: {
                parser: ts.parser,
            },
        },
    },
    {
        rules: {
            'unicorn/number-literal-case': 'warn',
            camelcase: 'off',
            'sort-keys': 'off',
            'no-inline-comments': 'off',
            'sort-vars': 'off',
            'no-magic-numbers': 'off',
            'no-ternary': 'off',
            'sort-imports': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/import-style': 'off',
            'no-underscore-dangle': 'off',
            'no-plusplus': 'off',
            'one-var': 'off',
            'id-length': 'off',
            'grouped-accessor-pairs': 'off',
            'no-use-before-define': 'off',
            'prettier/prettier': 'off',
            'unicorn/filename-case': 'off',
            'max-classes-per-file': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'max-lines': 'off',
            'class-methods-use-this': 'off',
            'max-statements': 'off',
            'init-declarations': 'off',
            'max-lines-per-function': 'off',
            'unicorn/numeric-separators-style': 'off',
            'unicorn/no-object-as-default-parameter': 'off',
            'max-params': 'off',
            'no-warning-comments': 'off',
            '@stylistic/multiline-ternary': ['error', 'always-multiline'],
            '@stylistic/operator-linebreak': ['error', 'before'],
            'no-console': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/unbound-method': 'off',
            'capitalized-comments': 'off',
            'no-undefined': 'off',
        },
    }
)
