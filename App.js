import { SafeAreaView, StyleSheet } from 'react-native';
import AppContainer from './src/Components/AppContainer';
import i18next from './src/i18n/i18n';
import RNLanguageDetector from './src/i18n/RNLanguageDetector';
import { oneUnitFlex, textColor } from './src/theme';

const App = () => {
  i18next.use(RNLanguageDetector);
  return (
    <SafeAreaView style={styles.main}>
      <AppContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    ...oneUnitFlex,
    ...textColor,
  },
});

export default App;
