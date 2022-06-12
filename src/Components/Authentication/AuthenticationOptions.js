/* eslint-disable react/prop-types */
import {
  StyleSheet, View,
} from 'react-native';
import { useContext } from 'react';
import CTAButton from '../Buttons/CTAButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import { LOGIN_FORM, REGISTER_FORM } from './AuthenticationFormTypes';
import { oneUnitFlex } from '../../theme';
import FormLogo from './FormLogo';

const AuthenticationOptions = ({ navigation }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();

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
