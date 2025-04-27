import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const isProd = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  base: '/evoke/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: 'assets/[name].[ext]',
        assets: {
          include: ['src/assets/**/*'],
          exclude: []
        }
      }
    },
    assetsInlineLimit: 0 // Ensures all images are processed as assets
  }
})
