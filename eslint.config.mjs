// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ignores: ['**/archive/*.json'],
  svelte: true,
  unocss: true,
})
