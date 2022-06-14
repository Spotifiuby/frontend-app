/* eslint-disable react/prop-types */
import {
  StyleSheet, View,
} from 'react-native';
import CTAButton from '../Buttons/CTAButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import { LOGIN_FORM, REGISTER_FORM } from './AuthenticationFormTypes';
import { oneUnitFlex } from '../../theme';
import FormLogo from './FormLogo';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const AuthenticationOptions = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FormLogo />
      <View style={styles.buttonsContainer}>
        <CTAButton
          style={styles.newUserButton}
          title={t('New Account')}
          onPress={() => {
            navigation.navigate(REGISTER_FORM, {
              afterRegistrationSuccess: () => {
                navigation.navigate(LOGIN_FORM);
              },
            });
          }}
          upperCased={false}
        />
        <SecondaryButton
          title={t('Login')}
          onPress={() => navigation.navigate(LOGIN_FORM)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    bottom: 0,
    marginBottom: 100,
    position: 'absolute',
  },
  container: {
    ...oneUnitFlex,
    alignItems: 'center',
  },
});

export default AuthenticationOptions;
