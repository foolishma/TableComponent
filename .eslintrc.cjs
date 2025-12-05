module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    // Vue 相关规则
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'warn',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/max-attributes-per-line': 'off',
    // 强制使用 <script> 或 <script setup> 而不是 <script lang="ts"> - 禁止 TypeScript
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: ['ts', 'tsx']
        }
      }
    ],
    // JavaScript 相关规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    // Prettier 相关规则
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // Vue 文件中允许未使用的变量（因为可能是模板中使用的）
        'no-unused-vars': 'warn',
        'vue/no-unused-vars': 'warn',
        // 允许 <script setup> 不需要 lang 属性
        'vue/component-tags-order': [
          'error',
          {
            order: ['template', 'script', 'style']
          }
        ],
        // 允许 <script setup> 不需要 lang 属性
        'vue/block-lang': 'off'
      }
    }
  ]
}
