import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

const appDir = path.resolve(__dirname);
const srcDir = path.join(appDir, 'src');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': srcDir
        },
    },
    base: '/cardFighters/'
});
