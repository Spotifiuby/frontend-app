import { StyleSheet, Image, View } from 'react-native';
import { useState } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/logo.png';
import LoginForm from './LoginForm';
import CTAButton from '../Buttons/CTAButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import RegisterForm from './RegisterForm';

const INIT_AUTH_FORM = 'INIT_AUTH_FORM';
const LOGIN_FORM = 'LOGIN_FORM';
const REGISTER_FORM = 'REGISTER_FORM';

const AuthenticationOptions = ({ setCurrentForm }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.buttonsContainer}>
      <CTAButton
        style={styles.newUserButton}
        title={t('New Account')}
        onPress={() => setCurrentForm(REGISTER_FORM)}
        upperCased={false}
      />
      <SecondaryButton
        title={t('Login')}
        onPress={() => setCurrentForm(LOGIN_FORM)}
      />
    </View>
  );
};

AuthenticationOptions.propTypes = {
  setCurrentForm: propTypes.func.isRequired,
};

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
  buttonsContainer: {
    bottom: 0,
    marginBottom: 100,
    position: 'absolute',
  },
  logo: {
    height: 200,
    marginTop: '25%',
    width: 200,
  },
});

export default Authentication;
