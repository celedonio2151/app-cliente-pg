module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // This plugin is used to ensure that the code is compatible with both
    // React Native and web platforms.
    'react-native-reanimated/plugin',
    // This plugin is used to enable the use of the `useWindowDimensions` hook
    // in React Native.
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
