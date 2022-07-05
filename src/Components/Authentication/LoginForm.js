/* eslint-disable react/prop-types */
import {
  View, StyleSheet,
} from 'react-native';
import React, { useState, useContext } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import PasswordInput from '../Inputs/PasswordInput';
import CTAButton from '../Buttons/CTAButton';
import {
  crossCentered, formContentWidth, tenMarginTop,
} from '../../theme';
import FormField, { clearErrorsWith } from '../Inputs/FormField';
import ErrorCard from '../Inputs/ErrorCard';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import FormLogo from './FormLogo';
import EmailInput from '../Inputs/EmailInput';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import SecondaryButton from '../Buttons/SecondaryButton';

function loginUIAction(authSystem, email, password, setErrorMessage) {
  authSystem.login({ email, password })
    .catch(({ message }) => setErrorMessage(message));
}

const redirectUrl = makeRedirectUri({ useProxy: true });

const LoginForm = () => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '1055958726450-p82kb29fgkrii996d2vqsem77em0c405.apps.googleusercontent.com',
    redirectUri: redirectUrl,
    // clientId: '1055958726450-57ju97uiorb6vnl0eh45cg326dh93kvh.apps.googleusercontent.com',
  });
  const clearErrorAfter = (setField) => clearErrorsWith(errorMessage, setErrorMessage, setField);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      authSystem.useFacebookAuth(id_token)
        .catch(({ message }) => setErrorMessage(message));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <FormLogo />
      <View style={styles.loginForm}>
        <FormField label={t('Email')}>
          <EmailInput email={email} setEmail={clearErrorAfter(setEmail)} />
        </FormField>
        <FormField label={t('Password')}>
          <PasswordInput
            password={password}
            setPassword={clearErrorAfter(setPassword)}
          />
        </FormField>
        <View style={styles.loginButton}>
          <CTAButton
            onPress={() => {
              loginUIAction(authSystem, email, password, setErrorMessage);
            }}
            title={t('Login')}
            accessibilityLabel={t('Login button')}
            disabled={!email || !password}
          />
          <SecondaryButton
            title={t('Sign in using Facebook')}
            onPress={() => {
              promptAsync();
            }}
          />
        </View>
        <ErrorCard errorMessage={t(errorMessage)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: crossCentered,
  loginButton: {
    ...crossCentered,
    ...tenMarginTop,
  },
  loginForm: formContentWidth,
});

export default LoginForm;
