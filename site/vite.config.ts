/**
 * @file vite config
 * @see {@link https://vitejs.dev/config/}
 */

import { svelte as Svelte } from '@sveltejs/vite-plugin-svelte'
import { presetIcons, presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    Svelte(),
    UnoCSS({
      presets: [presetUno(), presetIcons()],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'IXingTong',
        short_name: 'IXingTong',
        theme_color: '#818cf8',
      },
    }),
  ],

  server: {
    open: true,
  },
})
