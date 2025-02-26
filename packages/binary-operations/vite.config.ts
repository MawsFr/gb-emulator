import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: [resolve(__dirname, 'src/index.ts')],
            formats: ['es', 'umd'],
            name: 'binary-operations',
            fileName: (format) => `binary-operations.${format}.js`,
        },
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': resolve('/'),
            src: resolve('src/'),
        },
    },
    plugins: [
        dts({
            outDir: 'dist/types',
            rollupTypes: true,
            tsconfigPath: './tsconfig.json',
        }),
    ],
})
