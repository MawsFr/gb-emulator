import { defineConfig } from 'vitest/config'
import { resolve } from "path";

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            reporter: 'html',
            provider: 'v8',
        },
        isolate: false,
        setupFiles: [ '../test.setup.js' ],
    },
    resolve: {
        alias: {
            '@': resolve('src/')
        }
    },
})