import { useTranslation } from 'react-i18next';
import {
  View, TextInput, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import propTypes from 'prop-types';
import PasswordInput from '../Inputs/PasswordInput';
import CTAButton from '../Buttons/CTAButton';
import { register } from '../../Model/authentication';
import {
  crossCentered, formContentWidth, tenMarginTop, textField,
} from '../../theme';
import FormField, { clearErrorsWith } from '../Inputs/FormField';
import ErrorCard from '../Inputs/ErrorCard';

function registerFromUIAction({ email, password }, afterRegistrationSuccess, setErrorMessage) {
  register({ email, password })
    .then(() => {
      afterRegistrationSuccess();
    })
    .catch(({ message }) => setErrorMessage(message));
}

const RegisterForm = ({ afterRegistrationSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
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
            registerFromUIAction({ email, password }, afterRegistrationSuccess, setErrorMessage);
          }}
          title={t('Register')}
          accessibilityLabel={t('Register button')}
          disabled={!email || !password || password !== repeatedPassword}
        />
      </View>
      <ErrorCard errorMessage={t(errorMessage)} />
    </View>
  );
};

RegisterForm.propTypes = {
  afterRegistrationSuccess: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  loginButton: {
    ...crossCentered,
    ...tenMarginTop,
  },
  loginForm: formContentWidth,
  textField,
});

export default RegisterForm;
