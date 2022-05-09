import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { textField } from '../../theme';

const PasswordInput = ({ password, setPassword }) => {
  const { t } = useTranslation();
  return (
    <TextInput
      style={textField}
      value={password}
      onChangeText={setPassword}
      placeholder={t('Password')}
      autocomplete="password"
      textContentType="password"
      accessibilityLabel={t('Password input')}
      secureTextEntry
    />
  );
};

PasswordInput.propTypes = {
  password: propTypes.string.isRequired,
  setPassword: propTypes.func.isRequired,
};

export default PasswordInput;
