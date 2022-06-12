/* eslint-disable react/prop-types */
import {
  View, StyleSheet,
} from 'react-native';
import { useState, useContext } from 'react';
import PasswordInput from '../Inputs/PasswordInput';
import CTAButton from '../Buttons/CTAButton';
import {
  crossCentered, formContentWidth, tenMarginTop,
} from '../../theme';
import FormField, { clearErrorsWith } from '../Inputs/FormField';
import ErrorCard from '../Inputs/ErrorCard';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import FormLogo from './FormLogo';
import EmailInput from '../Inputs/EmailInput';

function loginUIAction(authSystem, email, password, setErrorMessage) {
  authSystem.login({ email, password })
    .catch(({ message }) => setErrorMessage(message));
}

const LoginForm = () => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorAfter = (setField) => clearErrorsWith(errorMessage, setErrorMessage, setField);

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
