import { StyleSheet, View } from 'react-native';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CTAButton from '../Buttons/CTAButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import { LOGIN_FORM, REGISTER_FORM } from './AuthenticationFormTypes';

const AuthenticationOptions = ({ setCurrentForm }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.buttonsContainer}>
      <CTAButton
        style={styles.newUserButton}
        title={t('New Account')}
        onPress={() => setCurrentForm(REGISTER_FORM)}
        upperCased={false}
      />
      <SecondaryButton
        title={t('Login')}
        onPress={() => setCurrentForm(LOGIN_FORM)}
      />
    </View>
  );
};

AuthenticationOptions.propTypes = {
  setCurrentForm: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonsContainer: {
    bottom: 0,
    marginBottom: 100,
    position: 'absolute',
  },
});

export default AuthenticationOptions;
