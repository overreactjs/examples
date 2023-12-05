import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@engine': path.resolve(__dirname, './src/engine'),
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
