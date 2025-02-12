import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: [ resolve(__dirname, 'src/index.ts') ],
            formats: [ 'es', 'umd' ],
            name: 'gb-emulator',
            fileName: (format) => `gb-emulator.${ format }.js`
        },
    },
    resolve: {
        alias: {
            '@': resolve('/'),
            'src': resolve('src/'),
        }
    },
    plugins: [
        dts({
            outDir: 'dist/types',
            rollupTypes: true,
            tsconfigPath: "./tsconfig.json"
        })
    ],
})
