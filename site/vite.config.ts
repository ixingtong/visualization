import { svelte as Svelte } from '@sveltejs/vite-plugin-svelte'
import { presetIcons, presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },

  plugins: [
    Svelte(),
    UnoCSS({
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
