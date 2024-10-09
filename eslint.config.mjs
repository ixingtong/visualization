import { defineESLintConfig, pluginPrettier, tseslint } from '@ntnyq/eslint-config'
import pluginSvelte from 'eslint-plugin-svelte'
import * as parserSvelte from 'svelte-eslint-parser'

const config = defineESLintConfig({
  ignores: ['**/archive/*.json'],
})

config.insertBefore(
  'ntnyq/prettier',
  {
    name: 'ntnyq/svelte/setup',
    plugins: {
      svelte: pluginSvelte,
    },
  },
  {
    name: 'ntnyq/svelte/rules',
    files: ['**/*.svelte'],
    languageOptions: {
      parser: parserSvelte,
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: tseslint.parser,
      },
    },
    processor: pluginSvelte.processors['.svelte'],
    rules: {
      'import/no-mutable-exports': 'off',
      'no-undef': 'off', // incompatible with most recent (attribute-form) generic types RFC
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^(\\$\\$Props$|\\$\\$Events$|\\$\\$Slots$)',
        },
      ],

      'svelte/comment-directive': 'error',
      'svelte/no-at-debug-tags': 'warn',
      'svelte/no-at-html-tags': 'error',
      'svelte/no-dupe-else-if-blocks': 'error',
      'svelte/no-dupe-style-properties': 'error',
      'svelte/no-dupe-use-directives': 'error',
      'svelte/no-dynamic-slot-name': 'error',
      'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
      'svelte/no-inner-declarations': 'error',
      'svelte/no-not-function-handler': 'error',
      'svelte/no-object-in-text-mustaches': 'error',
      'svelte/no-reactive-functions': 'error',
      'svelte/no-reactive-literals': 'error',
      'svelte/no-shorthand-style-property-overrides': 'error',
      'svelte/no-unknown-style-directive-property': 'error',
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/no-useless-mustaches': 'error',
      'svelte/require-store-callbacks-use-set-param': 'error',
      'svelte/system': 'error',
      'svelte/valid-each-key': 'error',
      'svelte/derived-has-same-inputs-outputs': 'error',
      'svelte/html-closing-bracket-spacing': 'error',
      'svelte/mustache-spacing': [
        'error',
        {
          directiveExpressions: 'always',
          textExpressions: 'always',
          attributesAndProps: 'never',
          tags: {
            openingBrace: 'always',
            closingBrace: 'always',
          },
        },
      ],
      'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
      'svelte/no-trailing-spaces': 'error',
      'svelte/spaced-html-comment': 'error',
      'svelte/html-quotes': [
        'error',
        {
          prefer: 'double',
          dynamic: {
            quoted: true,
            avoidInvalidUnquotedInHTML: false,
          },
        },
      ],
      'svelte/indent': [
        'error',
        {
          indent: 2,
          indentScript: false,
          alignAttributesVertically: true,
        },
      ],
    },
  },
)

config.insertAfter('ntnyq/prettier', {
  name: 'ntnyq/prettier/disabled/svelte',
  files: ['**/*.svelte'],
  plugins: {
    prettier: pluginPrettier,
  },
  rules: {
    'prettier/prettier': 'off',
  },
})

export default config
