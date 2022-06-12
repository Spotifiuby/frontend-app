/* eslint-disable react/prop-types */

import { useContext, useState } from 'react';
import {
  StyleSheet, TextInput, View,
} from 'react-native';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import NotificationSystemInterface from '../../SpotifiubySystem/NotificationSystem/NotificationSystemInterface';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import { fullWidth, oneUnitFlex, textField } from '../../theme';
import CTAButton from '../Buttons/CTAButton';
import FormField from '../Inputs/FormField';
import { MY_PROFILE } from '../Settings/SettingsNavigationOptions';
import Title from '../Text/Title';

const updateUserFrom = (originalUserInfo, newUserInfo, userSystem) => {
  return userSystem.update(originalUserInfo, newUserInfo);
};

const EditProfile = ({ navigation, route }) => {
  const system = useContext(SystemContext);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const notificationSystem = system.systemImplementing(NotificationSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const { userInfo } = route.params;
  const [firstName, setFirstName] = useState(userInfo.first_name);
  const [lastName, setLastName] = useState(userInfo.last_name);
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <View style={styles.container}>
      <Title text="Edit Profile" />
      <FormField label={t('First Name')}>
        <TextInput
          style={styles.textInput}
          value={firstName}
          onChangeText={setFirstName}
        />
      </FormField>
      <FormField label={t('Last Name')}>
        <TextInput
          style={styles.textInput}
          value={lastName}
          onChangeText={setLastName}
        />
      </FormField>
      <CTAButton
        title={t('Edit')}
        disabled={isProcessing}
        onPress={() => {
          setIsProcessing(true);
          updateUserFrom(userInfo, { firstName, lastName }, userSystem)
            .then((response) => response.json())
            .then((response) => {
              notificationSystem.show(t('Updated succesfully'));
              navigation.navigate(MY_PROFILE, { userInfo: response });
            })
            .catch(() => {
              notificationSystem.show(t('An error has occurred while updating'));
            })
            .finally(() => setIsProcessing(false));
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    ...fullWidth,
    paddingHorizontal: 15,
  },
  textInput: {
    ...textField,
    ...fullWidth,
  },
});
export default EditProfile;
