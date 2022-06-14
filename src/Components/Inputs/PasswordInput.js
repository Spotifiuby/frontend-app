import propTypes from 'prop-types';
import { TextInput } from 'react-native';
import { textField } from '../../theme';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

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
