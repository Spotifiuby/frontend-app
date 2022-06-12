/* eslint-disable react/prop-types */
import {
  View, StyleSheet,
} from 'react-native';
import { useState, useContext } from 'react';
import PasswordInput from '../Inputs/PasswordInput';
import CTAButton from '../Buttons/CTAButton';
import {
  crossCentered, fullWidth, tenMarginTop,
} from '../../theme';
import FormField, { clearErrorsWith } from '../Inputs/FormField';
import ErrorCard from '../Inputs/ErrorCard';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import FormLogo from './FormLogo';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import EmailInput from '../Inputs/EmailInput';

function registerFromUIAction(authSystem, credentials, afterRegistrationSuccess, setErrorMessage) {
  authSystem.register(credentials)
    .then(() => {
      afterRegistrationSuccess();
    })
    .catch(({ message }) => setErrorMessage(message));
}

const RegisterForm = ({ route }) => {
  const { afterRegistrationSuccess } = route.params;
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorAfter = (setField) => clearErrorsWith(errorMessage, setErrorMessage, setField);

  return (
    <View style={styles.container}>
      <FormLogo />
      <View style={styles.loginForm}>
        <FormField label={t('Email')}>
          <EmailInput
            emaial={email}
            setEmail={clearErrorAfter(setEmail)}
          />
        </FormField>
        <FormField label={t('Password')}>
          <PasswordInput
            password={password}
            setPassword={clearErrorAfter(setPassword)}
          />
        </FormField>
        <FormField label={t('Repeat password')}>
          <PasswordInput
            password={repeatedPassword}
            setPassword={clearErrorAfter(setRepeatedPassword)}
          />
          {password !== repeatedPassword && <ErrorCard errorMessage={t("Passwords don't match")} />}
        </FormField>
        <View style={styles.loginButton}>
          <CTAButton
            onPress={() => {
              registerFromUIAction(
                authSystem,
                { email, password },
                afterRegistrationSuccess,
                setErrorMessage,
              );
            }}
            title={t('Register')}
            accessibilityLabel={t('Register button')}
            disabled={!email || !password || password !== repeatedPassword}
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
  loginForm: {
    ...fullWidth,
    paddingHorizontal: 30,
  },
});

export default RegisterForm;
