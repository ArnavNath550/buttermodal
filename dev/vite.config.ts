import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Buttermodal: path.resolve(__dirname, '../src/index.ts'),
      'styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
      '@radix-ui/react-dialog': path.resolve(__dirname, '../node_modules/@radix-ui/react-dialog'),
      'framer-motion': path.resolve(__dirname, '../node_modules/framer-motion'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
