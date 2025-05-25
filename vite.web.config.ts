import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src/web'),
  build: {
    outDir: resolve(__dirname, 'dist/web'),
    rollupOptions: {
      input: {
        web: resolve(__dirname, 'src/web/index.html'),
      },
    },
  },
  server: {
    port: 3001,
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