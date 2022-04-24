import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import logo from '../../assets/logo.png';

const Login = ({ setToken }) => {
  const { t } = useTranslation();

  return (
    <>
      <Image
        style={styles.logo}
        source={logo}
        accessibilityLabel={t('Spotifiuby logo image')}
      />
      <LoginForm setToken={setToken} />
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 200,
    marginTop: '25%',
    width: 200,
  },
});

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
