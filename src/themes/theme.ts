// themes.ts
import {
  DefaultTheme as PaperLight,
  MD3DarkTheme as PaperDark,
} from 'react-native-paper';

const sharedColors = {
  primary: '#6200ee',
  secondary: '#03dac6',
  accent: '#f1c40f',
  error: '#e74c3c',
  warning: '#f39c12',
  success: '#2ecc71',
  info: '#3498db',
  neutral: '#95a5a6',
};

export const LightTheme = {
  ...PaperLight,
  roundness: 2,
  colors: {
    ...PaperLight.colors,
    ...sharedColors,
    background: '#ffffff',
    surface: '#f2f2f2',
    text: '#000000',
  },
};

export const DarkTheme = {
  ...PaperDark,
  roundness: 2,
  colors: {
    ...PaperDark.colors,
    ...sharedColors,
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
  },
};

export type ThemeColors = typeof DarkTheme.colors;
