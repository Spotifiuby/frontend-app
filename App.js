import AppContainer from './src/AppContainer';
import i18next from './src/i18n/i18n';
import RNLanguageDetector from './src/i18n/RNLanguageDetector';

const App = () => {
  i18next.use(RNLanguageDetector);
  return <AppContainer />;
};

export default App;
