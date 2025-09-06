import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use GitHub Pages base path only when building for Pages
  base: mode === 'gh-pages' ? '/fp-vm/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'src': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))
