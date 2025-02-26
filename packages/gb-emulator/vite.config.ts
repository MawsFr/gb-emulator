import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    build: {
        lib: {
            entry: [resolve(__dirname, 'src/index.ts')],
            formats: ['es', 'umd'],
            name: 'gb-emulator',
            fileName: (format) => `gb-emulator.${format}.js`,
        },
    },
    plugins: [
        tsconfigPaths(),
        dts({
            outDir: 'dist/types',
            rollupTypes: true,
            tsconfigPath: './tsconfig.json',
        }),
    ],
})
