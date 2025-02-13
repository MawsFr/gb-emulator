import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tsconfigPaths from "vite-tsconfig-paths/dist";

export default defineConfig({
    build: {
        lib: {
            entry: [ resolve(__dirname, 'src/index.ts') ],
            formats: [ 'es', 'umd' ],
            name: 'gb-emulator',
            fileName: (format) => `gb-emulator.${ format }.js`
        },
    },
    plugins: [
        tsconfigPaths(),
        dts({
            outDir: 'dist/types',
            rollupTypes: true,
            tsconfigPath: "./tsconfig.json"
        })
    ],
})
