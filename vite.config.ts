import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'; // Import

// https://vite.dev/config/
export default defineConfig(({ command }) => ({ // Access command
  plugins: [
    react(),
    // Add visualizer plugin only for 'build' command
    command === 'build' && visualizer({
      filename: 'dist/stats.html', // Output file in the dist folder
      open: true,                 // Automatically open it in the browser after build
      gzipSize: true,             // Show GZIP sizes
      brotliSize: true,           // Show Brotli sizes
    }),
  ].filter(Boolean), // Filter out falsy values if visualizer is not added in dev
}));
