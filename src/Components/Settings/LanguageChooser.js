import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import SecondaryButton from '../Buttons/SecondaryButton';

const LanguageChooser = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <SecondaryButton
      title={t('Change language')}
      onPress={() => changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
      accessibilityLabel={t('Change applicacation language')}
    />
  );
};

export default LanguageChooser;
