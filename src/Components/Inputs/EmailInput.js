import propTypes from 'prop-types';
import { TextInput } from 'react-native';
import { useContext } from 'react';
import { textField } from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';

const EmailInput = ({ email, setEmail }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  return (
    <TextInput
      style={textField}
      value={email}
      onChangeText={setEmail}
      placeholder={t('Email')}
      autocomplete="email"
      keyboardType="email-address"
      textContentType="emailAddress"
      accessibilityLabel={t('Email input')}
    />
  );
};

EmailInput.propTypes = {
  email: propTypes.string.isRequired,
  setEmail: propTypes.func.isRequired,
};

export default EmailInput;
