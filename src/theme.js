const theme = {
  color: {
    background: '#191414',
    foreground: '#eee',
    primary: '#1db954',
  },
  fontWeight: {
    primary: 'bold',
  },
};

export const oneUnitFlex = { flex: 1 };
export const crossCentered = { alignItems: 'center' };
export const mainCentered = { justifyContent: 'center' };
export const primary = { backgroundColor: theme.color.primary, color: theme.color.foreground };
export const bold = { fontWeight: 'bold' };
export const disabledOpacity = { opacity: '0.4' };
export const textColor = { color: theme.color.foreground };
export const backgroundColor = { backgroundColor: theme.color.background };
export const roundedButtonBorder = { borderRadius: 300 };
export const leftAligned = { alignItems: 'left' };
export const formContentWidth = { width: '80%' };
export const tenMarginTop = { marginTop: 10 };
export const errorContainer = { backgroundColor: '#CF6679' };
export const paddedContainer = { paddingVertical: 8, paddingHorizontal: 12 };

export const textField = {
  ...textColor,
  ...paddedContainer,
  backgroundColor: '#333',
  marginTop: 10,
  marginBottom: 20,
};

export default theme;
