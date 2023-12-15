import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@engine': path.resolve(__dirname, './src/engine'),
      '@state': path.resolve(__dirname, './src/state'),
    },
  },
  plugins: [
    react(),
    svgr({ 
      svgrOptions: {
        ref: true,
      },
    }),
  ],
})
