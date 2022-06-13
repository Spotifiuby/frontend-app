import { StyleSheet, Image } from 'react-native';
import logo from '../../../assets/logo.png';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const FormLogo = () => {
  const { t } = useTranslation();

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
