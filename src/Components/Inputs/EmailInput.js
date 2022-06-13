import propTypes from 'prop-types';
import { TextInput } from 'react-native';
import { textField } from '../../theme';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const EmailInput = ({ email, setEmail }) => {
  const { t } = useTranslation();
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
