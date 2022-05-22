import { Platform, NativeModules } from 'react-native';

const platformLocale = (platformOS) => {
  if (platformOS === 'ios') {
    return NativeModules.SettingsManager.settings.AppleLocale
      || NativeModules.SettingsManager.settings.AppleLanguages[0]; // iOS 13
  }
  if (platformOS === 'web') {
    return navigator.language;
  }
  return NativeModules.I18nManager.localeIdentifier;
};

const RNLanguageDetector = {
  type: 'languageDetector',
  init: () => {},
  detect: () => platformLocale(Platform.OS).split('_')[0],
  cacheUserLanguage: () => {},
};

export default RNLanguageDetector;
