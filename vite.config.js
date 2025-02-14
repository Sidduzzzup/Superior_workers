// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // Ensure the build output goes to 'dist'
//     chunkSizeWarningLimit: 1000, // Prevents warning about large chunks
//   },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // 👈 Ensures relative paths in built files
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
  },
});
