import {
  View, TextInput, StyleSheet, Switch,
} from 'react-native';
import { useState, useContext } from 'react';
import propTypes from 'prop-types';
import CTAButton from '../Buttons/CTAButton';
import {
  crossCentered, fullWidth, tenMarginTop, textField,
} from '../../theme';
import FormField from '../Inputs/FormField';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import FormLogo from './FormLogo';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';

const completeUserInformation = (userSystem, userInformation) => {
  return userSystem.completeUserRegistrationWith(userInformation)
    .then(() => userSystem.userType());
};

const SecondStepRegistration = ({ setUserType }) => {
  const system = useContext(SystemContext);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUploader, setIsUploader] = useState(false);
  return (
    <View style={styles.container}>
      <FormLogo />
      <View style={styles.loginForm}>
        <FormField label={t('First name')}>
          <TextInput
            style={styles.textField}
            value={firstName}
            onChangeText={setFirstName}
            placeholder={t('First name')}
            accessibilityLabel={t('First name input')}
          />
        </FormField>
        <FormField label={t('Last name')}>
          <TextInput
            style={styles.textField}
            value={lastName}
            onChangeText={setLastName}
            placeholder={t('Last name')}
            accessibilityLabel={t('Last name input')}
          />
        </FormField>
        <View style={styles.inlineSwitchContainer}>
          <FormField label={t('Will you upload content?')} />
          <Switch
            style={styles.roleSwitch}
            value={isUploader}
            onValueChange={setIsUploader}
          />
        </View>
        <View style={styles.loginButton}>
          <CTAButton
            onPress={() => {
              completeUserInformation(
                userSystem,
                { firstName, lastName, isUploader },
              ).then(setUserType);
            }}
            title={t('Finish registration')}
            accessibilityLabel={t('Finish registration')}
            disabled={!firstName || !lastName}
          />
        </View>
      </View>
    </View>
  );
};

SecondStepRegistration.propTypes = {
  setUserType: propTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: crossCentered,
  inlineSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  loginButton: {
    ...crossCentered,
    ...tenMarginTop,
  },
  loginForm: {
    ...fullWidth,
    paddingHorizontal: 30,
  },
  textField,
});

export default SecondStepRegistration;
