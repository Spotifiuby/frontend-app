import { useTranslation } from 'react-i18next';
import CTAButton from '../Buttons/CTAButton';

const LanguageChooser = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <CTAButton
      title={t('Change language')}
      onPress={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
      accessibilityLabel={t('Change applicacation language')}
    />
  );
};

export default LanguageChooser;
