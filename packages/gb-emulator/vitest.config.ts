import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        coverage: {
            enabled: true,
            reporter: 'html',
            provider: 'v8',
        },
        isolate: false,
        setupFiles: [ '../test.setup.js' ],
    },
})