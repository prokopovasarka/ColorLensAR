// Mock NativeModules before jest-expo tries to access it
jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
  default: {},
  __esModule: true,
}));

// Mock other React Native modules that might cause issues
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: (obj) => obj.ios || obj.default,
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');