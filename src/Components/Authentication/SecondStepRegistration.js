/* eslint-disable react/prop-types */
import {
  View, TextInput, StyleSheet, Switch,
} from 'react-native';
import { useState, useContext } from 'react';
import CTAButton from '../Buttons/CTAButton';
import {
  crossCentered, fullWidth, tenMarginTop, textField,
} from '../../theme';
import FormField from '../Inputs/FormField';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import FormLogo from './FormLogo';
import AuthSystemInterface from '../SpotifiubySystem/AuthSystem/AuthSystemInterface';

const SecondStepRegistration = () => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUploader, setIsUploader] = useState('');
  return (
    <>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}>
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
              console.log(
                authSystem,
                { firstName, lastName, isUploader },
              );
            }}
            title={t('Finish registration')}
            accessibilityLabel={t('Finish registration')}
            disabled={!firstName || !lastName || !isUploader}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    ...crossCentered,
    ...tenMarginTop,
  },
  loginForm: {
    ...fullWidth,
    paddingHorizontal: 30,
  },
  roleSwitch: {
    display: 'inline',
  },
  textField,
});


export default SecondStepRegistration;
