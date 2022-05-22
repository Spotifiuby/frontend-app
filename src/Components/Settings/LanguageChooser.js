import { useContext } from 'react';
import CTAButton from '../Buttons/CTAButton';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';

const LanguageChooser = () => {
  const system = useContext(SystemContext);
  const { t, i18n } = system.systemImplementing(TranslationSystemInterface).stringTranslator();

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
