module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  sourceMaps: true,
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
