// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ignore co-located test files.
config.resolver.blockList = /.+\.test\.ts(x?)/;

module.exports = config;
