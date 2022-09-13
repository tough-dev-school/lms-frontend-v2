module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['<rootDir>/tests/global-stubs.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!vue-awesome)'],
};
