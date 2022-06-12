import propTypes from 'prop-types';
import { TextInput } from 'react-native';
import { useContext } from 'react';
import { textField } from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';

const PasswordInput = ({ password, setPassword }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
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
