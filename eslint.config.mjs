/* eslint-env node */
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'

/**
 * Taurus Portal ESLint flat config (ESLint 9.x).
 *
 * NOTE: uses NON-type-checked TS rules only. Type integrity is the job of
 * `vue-tsc --noEmit`; separating the two keeps ESLint fast and avoids
 * parserOptions.project / "parser not set for TS rule" false failures on
 * .mjs configs or vendored .vue files with cross-module generics.
 */
export default tseslint.config(
  // ---- Global ignores (always match) ----
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.d.ts',
      'public/**',
      'scripts/check-dist.mjs',
      '*.config.ts',
      '*.config.js',
      '*.config.cjs',
      '.github/**',
      '_archive/**',
      'pnpm-lock.yaml',
    ],
  },

  // ---- JavaScript (ESM) ----
  js.configs.recommended,

  // Register TS + Vue plugins globally so rule keys resolve in shared blocks.
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      vue: pluginVue,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.nodeBuiltin,
      },
    },
  },

  // ---- TypeScript (recommended, no type-info required) ----
  ...tseslint.configs.recommended.map((cfg) => ({
    ...cfg,
    files: ['**/*.{ts,tsx,vue,mts,cts}'],
  })),

  // ---- Vue 3 flat/recommended ----
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/no-v-html': 'warn',
      'vue/first-attribute-linebreak': 'off',
      'vue/attributes-order': 'off',
      'vue/html-indent': 'off',
    },
  },

  // ---- Plain TS ----
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  // ---- Shared rule tuning (everywhere) ----
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/consistent-type-imports': 'off',
      // Rules requiring type information → explicitly OFF, we rely on
      // vue-tsc --noEmit for type correctness.
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'off',

      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'prefer-const': 'error',
      'no-useless-escape': 'warn',
      'no-undef': 'off', // TypeScript + .vue handle this better on their own.
    },
  },

  // ---- Prettier conflict suppression LAST ----
  eslintConfigPrettier,
)
