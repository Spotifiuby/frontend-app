/* eslint-disable react/prop-types */

import { useContext, useState } from 'react';
import {
  StyleSheet, TextInput, View,
} from 'react-native';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import useNotificationSystem from '../../SpotifiubySystem/NotificationSystem/useNotificationSystem';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import { fullWidth, oneUnitFlex, textField } from '../../theme';
import CTAButton from '../Buttons/CTAButton';
import FormField from '../Inputs/FormField';
import { MY_PROFILE } from '../Settings/SettingsNavigationOptions';
import Title from '../Text/Title';
import { Picker } from 'react-native-web';

const updateUserFrom = (originalUserInfo, newUserInfo, userSystem) => {
  return userSystem.update(originalUserInfo, newUserInfo);
};

const updateSubscriptionFrom = (originalUserInfo, oldType, newType, userSystem) => {
  if (newType === '-') {
    return userSystem.removeSubscription(originalUserInfo.email);
  }
  if (!oldType) {
    return userSystem.createSubscription(originalUserInfo.email, newType);
  }
  return userSystem.updateSubscription(originalUserInfo.email, newType);
};

const EditProfile = ({ navigation, route }) => {
  const system = useContext(SystemContext);
  const notificationSystem = useNotificationSystem();
  const userSystem = system.systemImplementing(UserSystemInterface);
  const { t } = useTranslation();
  const { userInfo, subscriptionInfo } = route.params;
  const [subscriptionType, setSubscriptionType] = useState(subscriptionInfo?.subscription_type_id ? subscriptionInfo.subscription_type_id : '-');
  const [firstName, setFirstName] = useState(userInfo.first_name);
  const [lastName, setLastName] = useState(userInfo.last_name);
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <>
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
          title={t('Submit')}
          disabled={isProcessing}
          onPress={() => {
            setIsProcessing(true);
            updateUserFrom(userInfo, { firstName, lastName }, userSystem)
              .then((response) => response.json())
              .then((response) => {
                notificationSystem.show(t('Profile updated successfully'));
                navigation.navigate(MY_PROFILE, { userInfo: response, subscriptionInfo });
              })
              .catch(() => {
                notificationSystem.show(t('An error has occurred while updating profile'));
              })
              .finally(() => setIsProcessing(false));
          }}
        />
      </View>
      <View style={styles.container}>
        <Title text="Edit Subscription" />
        <FormField label={t('Subscription')}>
          <Picker
            style={styles.textInput}
            selectedValue={subscriptionType}
            onValueChange={setSubscriptionType}
          >
            <Picker.Item label="-" value="-" />
            <Picker.Item label="Basic" value="Basic" />
            <Picker.Item label="Pro" value="Pro" />
            <Picker.Item label="Premium" value="Premium" />
          </Picker>
        </FormField>
        <CTAButton
          title={t('Submit')}
          disabled={isProcessing}
          onPress={() => {
            setIsProcessing(true);
            updateSubscriptionFrom(userInfo, subscriptionInfo?.subscription_type_id, subscriptionType, userSystem)
              .then((response) => response.json())
              .then((response) => {
                if (response) {
                  subscriptionInfo.subscription_type_id = response.subscription_type_id
                } else {
                  subscriptionInfo.subscription_type_id = null
                }
                notificationSystem.show(t('Subscription updated successfully'));
                navigation.navigate(MY_PROFILE, { userInfo, subscriptionInfo });
              })
              .catch(() => {
                notificationSystem.show(t('An error has occurred while updating subscription'));
              })
              .finally(() => setIsProcessing(false));
          }}
        />
      </View>
    </>
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
