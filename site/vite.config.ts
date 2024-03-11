import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import unoCSS from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'
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
    VitePWA({
      manifest: {
        name: 'IXingTong',
        short_name: 'IXingTong',
        theme_color: '#818cf8',
      },
      registerType: 'autoUpdate',
    }),
  ],
})
