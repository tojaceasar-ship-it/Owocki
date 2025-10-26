import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html')
      },
      external: ['react-redux']
    }
  },
  server: {
    port: 5173,
    open: true
  }
});