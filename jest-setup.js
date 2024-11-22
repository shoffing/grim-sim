jest.mock('expo-font');
require('react-native-reanimated').setUpTests();
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
