// @ts-check

import { defineESLintConfig, GLOB_SVELTE, parserTypeScript } from '@ntnyq/eslint-config'
import pluginSvelte from 'eslint-plugin-svelte'
import * as parserSvelte from 'svelte-eslint-parser'

export default defineESLintConfig(
  {
    ignores: ['**/archive/*.json'],
  },
  {
    name: 'ntnyq/svelte/setup',
    plugins: {
      svelte: pluginSvelte,
    },
  },
  {
    files: [GLOB_SVELTE],
    name: 'ntnyq/svelte/rules',
    processor: pluginSvelte.processors['.svelte'],
    languageOptions: {
      parser: parserSvelte,
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: parserTypeScript,
      },
    },
    rules: {
      'import/no-mutable-exports': 'off',
      // incompatible with most recent (attribute-form) generic types RFC
      'no-undef': 'off',
      'svelte/comment-directive': 'error',

      'svelte/derived-has-same-inputs-outputs': 'error',
      'svelte/html-closing-bracket-spacing': 'error',
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
      'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
      'svelte/no-trailing-spaces': 'error',
      'svelte/no-unknown-style-directive-property': 'error',
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/no-useless-mustaches': 'error',
      'svelte/require-store-callbacks-use-set-param': 'error',
      'svelte/spaced-html-comment': 'error',
      'svelte/system': 'error',
      'svelte/valid-each-key': 'error',
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
      'svelte/html-quotes': [
        'error',
        {
          prefer: 'double',
          dynamic: {
            avoidInvalidUnquotedInHTML: false,
            quoted: true,
          },
        },
      ],
      'svelte/indent': [
        'error',
        {
          alignAttributesVertically: true,
          indent: 2,
          indentScript: false,
        },
      ],
      'svelte/mustache-spacing': [
        'error',
        {
          attributesAndProps: 'never',
          directiveExpressions: 'always',
          textExpressions: 'always',
          tags: {
            closingBrace: 'always',
            openingBrace: 'always',
          },
        },
      ],
    },
  },
)
