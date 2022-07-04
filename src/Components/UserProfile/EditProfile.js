/* eslint-disable react/prop-types */

import { useContext, useState } from 'react';
import {
  ScrollView,
  StyleSheet, Text, TextInput, View, Picker,
} from 'react-native';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import useNotificationSystem from '../../SpotifiubySystem/NotificationSystem/useNotificationSystem';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import theme, { fullWidth, oneUnitFlex, textColor, textField } from '../../theme';
import CTAButton from '../Buttons/CTAButton';
import FormField from '../Inputs/FormField';
import { MY_PROFILE } from '../Settings/SettingsNavigationOptions';
import Title from '../Text/Title';

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
      <ScrollView style={styles.container}>
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
        <Title text="Edit Subscription" />
        <Text style={styles.userInfoWalletAddress}>
          Unlock premium Artists with our monthly subscription plans.
        </Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <View style={styles.tableInnerHeader}><Text style={styles.tableTextHeader}>Type</Text></View>
            <View style={styles.tableInnerHeader}><Text style={styles.tableTextHeader}>Description</Text></View>
            <View style={styles.tableInnerHeader}><Text style={styles.tableTextHeader}>Cost (monthly)</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>None</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>Listen to our free artists</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableTextCost}>Free</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>Basic</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>Access to our free and basic premium artists</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableTextCost}>0.000001 ETH</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>Pro</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>Access to more than 50% of the catalog</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableTextCost}>0.000002 ETH</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>Premium</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableText}>Enjoy full access to all artists!</Text></View>
            <View style={styles.tableInnerRow}><Text style={styles.tableTextCost}>0.000003 ETH</Text></View>
          </View>
        </View>
        <FormField label={t('Choose your subscription')}>
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
        <FormField label={t('Wallet Address')}>
          <Text style={styles.userInfoWalletAddress}>{t(userInfo.wallet_address)}</Text>
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
      </ScrollView>
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
  text: {
    ...textField,
  },
  userInfoWalletAddress: {
    ...textColor,
    fontSize: 13,
    paddingBottom: 30,
  },
  tableHead: {
    height: 40,
    backgroundColor: '#eee'
  },
  tableData: {
    margin: 6
  },
  tableContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  tableRow: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 15,
  },
  tableHeader: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  tableInnerHeader: {
    flex: 1,
    alignSelf: 'stretch',
  },
  tableInnerRow: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 5,
  },
  tableText: {
    ...textColor,
    alignSelf: 'center',
    alignItems: 'center',
  },
  tableTextHeader: {
    ...textColor,
    alignSelf: 'center',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
  tableTextCost: {
    ...textColor,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
export default EditProfile;
