module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@react-native-async-storage/async-storage|@reactvision/react-viro|color-namer)'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    'pages/**/*.{ts,tsx}',
    'styles/**/*.{ts,tsx}',
    '!pages/Camera.tsx', // Exclude Camera as it uses native AR features
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    './pages/ColorData.ts': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};