// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  overrides: [
    {
      files: [
        "jest-setup.js",
        "**/*.test.js",
        "**/*.test.jsx",
      ],
      env: {
        jest: true,
      },
    },
    {
      files: [
        "metro.config.js",
      ],
      env: {
        node: true,
      },
    },
  ],
};
