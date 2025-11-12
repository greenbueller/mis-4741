import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/submit': 'http://localhost:3000/',
      '/form': 'http://localhost:3000/',
    }
  },
  build: {
    outDir: 'dist'
  }
})
