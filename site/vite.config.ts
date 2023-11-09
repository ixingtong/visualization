import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import unoCSS from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },

  plugins: [
    svelte(),
    unoCSS({
      presets: [presetUno(), presetIcons()],
    }),
  ],
})
