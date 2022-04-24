import { useTranslation } from 'react-i18next';
import {
  View, TextInput, Text, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PasswordInput from './PasswordInput';
import CTAButton from './CTAButton';
import login from '../Model/login';
import {
  crossCentered, errorContainer, formContentWidth, paddedContainer, tenMarginTop, textField,
} from '../theme';
import FormField from './FormField';

function loginUIAction({ username, password }, setToken, setErrorMessage) {
  login({ username, password })
    .then((response) => {
      if (response.token) setToken(response.token);
      if (response.error) setErrorMessage(response.error);
    })
    .catch((error) => setErrorMessage(error.message));
}

const clearErrorsWith = (errors, setErrors, changeField) => ((value) => {
  if (errors) setErrors('');
  changeField(value);
});

const LoginForm = ({ setToken }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorWrapping = (setField) => clearErrorsWith(errorMessage, setErrorMessage, setField);
  return (
    <View style={formContentWidth}>
      <FormField label={t('Username')}>
        <TextInput
          style={textField}
          value={username}
          onChangeText={clearErrorWrapping(setUsername)}
          placeholder={t('Username')}
          accessibilityLabel={t('Username input')}
        />
      </FormField>
      <FormField label={t('Password')}>
        <PasswordInput password={password} setPassword={clearErrorWrapping(setPassword)} />
      </FormField>
      <View style={{ ...crossCentered, ...tenMarginTop }}>
        <CTAButton
          onPress={() => loginUIAction({ username, password }, setToken, setErrorMessage)}
          title={t('Login')}
          accessibilityLabel={t('Login button')}
          disabled={!username || !password}
        />
      </View>
      <ErrorCard errorMessage={errorMessage} />
    </View>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const ErrorCard = ({ errorMessage }) => {
  return (
    errorMessage
    && <Text style={errorStyles.card}>{errorMessage}</Text>
  );
};

const errorStyles = StyleSheet.create({
  card: {
    ...errorContainer,
    ...paddedContainer,
    ...tenMarginTop,
    borderRadius: 3,
  },
});

ErrorCard.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default LoginForm;
