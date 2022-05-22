import { StyleSheet, Image } from 'react-native';
import { useContext } from 'react';
import logo from '../../../assets/logo.png';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';

const FormLogo = () => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();

  return (
    <Image
      style={styles.logo}
      source={logo}
      accessibilityLabel={t('Spotifiuby logo image')}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 200,
    marginTop: '25%',
    width: 200,
  },
});

export default FormLogo;
