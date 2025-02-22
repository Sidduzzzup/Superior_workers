
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Keep this if using absolute paths, or change to './' for relative
  server: {
    proxy: {
      '/api': {
        target: 'https://superior-workers-backend.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000
  }
});
