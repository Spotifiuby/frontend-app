import { useTranslation } from 'react-i18next';
import {
  View, TextInput, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PasswordInput from './PasswordInput';
import CTAButton from './CTAButton';
import login from '../Model/login';
import {
  crossCentered, formContentWidth, tenMarginTop, textField,
} from '../theme';
import FormField from './FormField';
import ErrorCard from './ErrorCard';

function loginUIAction({ email, password }, setToken, setErrorMessage) {
  login({ email, password })
    .then(({ token }) => setToken(token))
    .catch(({ message }) => setErrorMessage(message));
}

const clearErrorsWith = (errors, setErrors, changeField) => ((value) => {
  if (errors) setErrors('');
  changeField(value);
});

const LoginForm = ({ setToken }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorAfter = (setField) => clearErrorsWith(errorMessage, setErrorMessage, setField);

  return (
    <View style={styles.loginForm}>
      <FormField label={t('Email')}>
        <TextInput
          style={styles.textField}
          value={email}
          onChangeText={clearErrorAfter(setEmail)}
          placeholder={t('Email')}
          accessibilityLabel={t('Email input')}
        />
      </FormField>
      <FormField label={t('Password')}>
        <PasswordInput
          password={password}
          setPassword={clearErrorAfter(setPassword)}
        />
      </FormField>
      <View style={styles.loginButton}>
        <CTAButton
          onPress={() => loginUIAction({ email, password }, setToken, setErrorMessage)}
          title={t('Login')}
          accessibilityLabel={t('Login button')}
          disabled={!email || !password}
        />
      </View>
      <ErrorCard errorMessage={t(errorMessage)} />
    </View>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  loginButton: {
    ...crossCentered,
    ...tenMarginTop,
  },
  loginForm: formContentWidth,
  textField,
});

export default LoginForm;
