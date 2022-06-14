const theme = {
  color: {
    background: '#120f0f',
    navigationBarColor: '#0d0c0c',
    foreground: '#eee',
    primary: '#1db954',
    overlay: 'rgba(0,0,0,0.8)',
    overlayTextColor: '#eee',
    secondaryText: '#aaa',
    secondarybackground: '#222',
    errorBackground: '#CF6679',
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
export const disabledOpacity = { opacity: 0.4 };
export const textColor = { color: theme.color.foreground };
export const backgroundColor = { backgroundColor: theme.color.background };
export const roundedButtonBorder = { borderRadius: 300 };
export const leftAligned = { alignItems: 'left' };
export const formContentWidth = { width: '80%' };
export const tenMarginTop = { marginTop: 10 };
export const errorContainer = { backgroundColor: theme.color.errorBackground };
export const dimContainer = { backgroundColor: '#222' };
export const paddedContainer = { paddingVertical: 8, paddingHorizontal: 12 };
export const secondaryText = { color: theme.color.secondaryText, fontSize: 12 };
export const fullWidth = { width: '100%' };
export const textField = {
  ...textColor,
  ...paddedContainer,
  backgroundColor: '#333',
  marginTop: 10,
  marginBottom: 20,
};

export const headerTitle = {
  ...textColor,
  fontSize: 25,
  fontWeight: 'bold',
  marginBottom: 20,
  marginTop: 30,
  textAlign: 'left',
};

export default theme;
