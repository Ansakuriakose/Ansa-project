module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app/assets': './src/assets',
          '@app/components': './src/components',
          '@app/constants': './src/constants',
          '@app/screens': './src/screens',
          '@app/navigations': './src/navigations',
          '@app/store': './src/store',
          '@app/services': './src/services',
          '@app/contexts': './src/contexts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
