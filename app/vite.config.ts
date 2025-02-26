import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/gb-emulator/',
    build: {
        outDir: 'dist',
    },
    resolve: {
        alias: {
            '@': resolve('/'),
            src: resolve('src/'),
        },
    },
});
