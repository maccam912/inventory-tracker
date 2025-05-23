import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createVuePlugin } from 'vite-plugin-vue2'; // Assuming Vue is used, replace with Alpine.js specific plugin if available

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
    createVuePlugin() // Replace with Alpine.js specific setup if needed
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});