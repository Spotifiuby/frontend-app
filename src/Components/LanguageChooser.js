import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-web';

const LanguageChooser = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <Button
      onPress={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
      title="Change language"
      color="#841584"
      accessibilityLabel={t('Change applicacation language')}
    />
  );
};

export default LanguageChooser;
