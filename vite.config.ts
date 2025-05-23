import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src/renderer'),
  build: {
    outDir: resolve(__dirname, 'dist/renderer'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/renderer/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    // Alpine.js doesn't need a specific Vite plugin
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});