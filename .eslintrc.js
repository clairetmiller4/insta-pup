module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'script'
  },
  extends: [
    'plugin:vue/recommended',
    'standard',
    'prettier/standard',
    'prettier',
    'prettier/vue'
  ],
  overrides: [
    {
      files: ['src/**'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: {
        browser: true
      }
    },
    {
      files: ['app.js', 'bin/**', 'backend/**'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'script'
      },
      env: {
        browser: true,
        node: true
      }
    }
  ]
};
