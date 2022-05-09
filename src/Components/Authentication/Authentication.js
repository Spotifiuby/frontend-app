import { StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/logo.png';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthenticationOptions from './AuthenticationOptions';
import { INIT_AUTH_FORM, LOGIN_FORM, REGISTER_FORM } from './AuthenticationFormTypes';

const Authentication = ({ setToken }) => {
  const { t } = useTranslation();
  const [currentForm, setCurrentForm] = useState(INIT_AUTH_FORM);

  return (
    <>
      <Image
        style={styles.logo}
        source={logo}
        accessibilityLabel={t('Spotifiuby logo image')}
      />
      {currentForm === INIT_AUTH_FORM
        ? <AuthenticationOptions setCurrentForm={setCurrentForm} /> : null}
      {currentForm === LOGIN_FORM
        ? <LoginForm setToken={setToken} /> : null}
      {currentForm === REGISTER_FORM
        ? (
          <RegisterForm
            afterRegistrationSuccess={() => setCurrentForm(LOGIN_FORM)}
          />
        ) : null}

    </>
  );
};

Authentication.propTypes = {
  setToken: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  logo: {
    height: 200,
    marginTop: '25%',
    width: 200,
  },
});

export default Authentication;
