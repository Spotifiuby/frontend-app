import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, View, Button,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-native-markdown-display';

const AppContainer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Markdown testID="main-message">
        { t('Open up `App.js` to start working on your app!') }
      </Markdown>

      <Markdown>
        {t('currentLanguageDisplayer', { lang: i18n.language })}
      </Markdown>
      <Button
        onPress={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
        title="Change language"
        color="#841584"
        accessibilityLabel="Change applicacation language"
      />
      <StatusBar style="auto" />
    </View>
  );
};

const defaultBackgroundColor = '#fff';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: defaultBackgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
});

export default AppContainer;
