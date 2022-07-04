import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import { oneUnitFlex, paddedContainer, textColor } from '../../theme';
import CTAButton from '../Buttons/CTAButton';
import FormField from '../Inputs/FormField';
import { EDIT_USER_PROFILE } from '../Settings/SettingsNavigationOptions';
import Title from '../Text/Title';
import CoverPicture from '../Songs/CoverPicture';

/* eslint-disable react/prop-types */
const Profile = ({ navigation, route }) => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const [authInfo, setAuthInfo] = useState('');
  const { t } = useTranslation();
  const { userInfo, subscriptionInfo } = route.params;
  const currentUserEmail = authInfo.email;

  useEffect(() => {
    authSystem.getAuthInfo().then(setAuthInfo);
  }, []);

  if (!userInfo?.email) return null;
  return (
    <View style={styles.container}>
      <View style={styles.profileImage}>
        <CoverPicture user={userInfo} style={{borderRadius: 300,}}/>
      </View>
      <View style={styles.textTitle}>
        <Title text={userInfo.first_name + ' ' + userInfo.last_name} />
      </View>
      <FormField label={t('Email')}>
        <Text style={styles.userInfo}>{userInfo.email}</Text>
      </FormField>
      <FormField label={t('First Name')}>
        <Text style={styles.userInfo}>{userInfo.first_name}</Text>
      </FormField>
      <FormField label={t('Last Name')}>
        <Text style={styles.userInfo}>{userInfo.last_name}</Text>
      </FormField>
      {
        currentUserEmail === userInfo.email ? (
          <>
            <FormField label={t('User type')}>
              <Text style={styles.userInfo}>{t(userInfo.user_type)}</Text>
            </FormField>
            <FormField label={t('Subscription')}>
              <Text style={styles.userInfo}>{t(subscriptionInfo?.subscription_type_id ? subscriptionInfo.subscription_type_id : '-')}</Text>
            </FormField>
            <FormField label={t('Wallet Address')} hide={userInfo.email !== currentUserEmail}>
              <Text style={styles.userInfoWalletAddress}>{t(userInfo.wallet_address)}</Text>
            </FormField>
            <CTAButton title="Editar" onPress={() => navigation.navigate(EDIT_USER_PROFILE, {
              userInfo,
              subscriptionInfo
            })}/>
          </>
        ) : (
          <CTAButton style={styles.newChatButton} title="Open Chat" onPress={() => {
            console.log('Implement me!');
          }}/>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  profileImage: {
    height: 110,
    width: 110,
    alignSelf: 'center',
    marginTop: 10,
  },
  textTitle: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  userInfo: {
    ...textColor,
    fontSize: 20,
    paddingBottom: 30,
  },
  userInfoWalletAddress: {
    ...textColor,
    fontSize: 13,
    paddingBottom: 30,
  },
  newChatButton: {
    ...textColor,
    ...paddedContainer,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  }
});

export default Profile;
