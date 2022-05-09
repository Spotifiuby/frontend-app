import { useTranslation } from 'react-i18next';
import {
  View, TextInput, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import propTypes from 'prop-types';
import PasswordInput from '../Inputs/PasswordInput';
import CTAButton from '../Buttons/CTAButton';
import { login } from '../../Model/authentication';
import {
  crossCentered, formContentWidth, tenMarginTop, textField,
} from '../../theme';
import FormField, { clearErrorsWith } from '../Inputs/FormField';
import ErrorCard from '../Inputs/ErrorCard';

function loginUIAction({ email, password }, setToken, setErrorMessage) {
  login({ email, password })
    .then(({ token }) => setToken(token))
    .catch(({ message }) => setErrorMessage(message));
}

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
  setToken: propTypes.func.isRequired,
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
