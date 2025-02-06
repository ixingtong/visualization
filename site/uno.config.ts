/**
 * @file UnoCSS config
 */

import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  safelist: [],

  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetUno(),
    presetIcons({
      autoInstall: true,
      scale: 1.2,
    }),
  ],

  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex-center flex-col',
      'wh-full': 'w-full h-full',
    },
  ],
})
