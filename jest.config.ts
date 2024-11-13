import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  moduleDirectories: [
    'node_modules',
    'utils',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|...|react-redux)|((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testTimeout: 30000,
};

export default config;

