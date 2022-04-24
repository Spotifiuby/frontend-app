import { render } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';
import { Platform, NativeModules } from 'react-native';
import AppContainer from '../Components/AppContainer';
import i18n from '../i18n/i18n';

const setUpWebPlatform = (lang = 'en') => {
  Platform.OS = 'web';
  global.navigator = { language: lang };
};

const setUpIOSPlatform = (lang = 'en') => {
  Platform.OS = 'ios';
  NativeModules.SettingsManager = { settings: { AppleLocale: lang } };
};

const setUpAndroidPlatform = (lang = 'en') => {
  Platform.OS = 'android';
  NativeModules.I18nManager = { localeIdentifier: lang };
};

describe('AppContainer', () => {
  setUpWebPlatform();
  it('is created succesfully (web)', () => {
    setUpWebPlatform();
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <AppContainer />
      </I18nextProvider>,
    );
    const mainText = getByText(/Open up/);
    expect(mainText).toHaveTextContent(/Open up/);
  });

  it('is created succesfully (ios)', () => {
    setUpIOSPlatform();
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <AppContainer />
      </I18nextProvider>,
    );
    const mainText = getByText(/Open up/);
    expect(mainText).toHaveTextContent(/Open up/);
  });

  it('is created succesfully (android)', () => {
    setUpAndroidPlatform();
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <AppContainer />
      </I18nextProvider>,
    );
    const mainText = getByText(/Open up/);
    expect(mainText).toHaveTextContent(/Open up/);
  });
});
