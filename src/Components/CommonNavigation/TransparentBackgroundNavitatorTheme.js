import { DefaultTheme } from '@react-navigation/native';

const TransparentBackgroundNavitatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default TransparentBackgroundNavitatorTheme;
