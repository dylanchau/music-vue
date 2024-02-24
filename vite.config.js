import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    // eslint-disable-next-line no-undef
    // open: process.env.BROWSER,
    // set host to true the server will listen all addresses. For more detail: https://vitejs.dev/config/server-options#server-host
    host: true
  }
})
