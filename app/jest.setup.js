require('@testing-library/jest-native/extend-expect');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock color-namer
jest.mock('color-namer', () => {
  return jest.fn((color) => ({
    ntc: [{ name: 'Mocked Color Name' }],
  }));
});

// Mock react-native-pixel-color
jest.mock('react-native-pixel-color', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock expo modules
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {},
  },
}));

jest.mock('expo-file-system', () => ({
  documentDirectory: 'file://mock/',
}));

// Mock react-native-view-shot
jest.mock('react-native-view-shot', () => ({
  captureRef: jest.fn(),
}));

// Mock @react-native-camera-roll/camera-roll
jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: {
    save: jest.fn(),
  },
}));

// Mock Viro AR
jest.mock('@reactvision/react-viro', () => ({
  ViroARSceneNavigator: 'ViroARSceneNavigator',
  ViroARScene: 'ViroARScene',
  ViroText: 'ViroText',
  ViroConstants: {
    TRACKING_NORMAL: 3,
  },
}));