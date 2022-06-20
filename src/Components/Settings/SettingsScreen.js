/* eslint-disable react/prop-types */
import {
  View, StyleSheet,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';

import LanguageChooser from './LanguageChooser';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SecondaryButton from '../Buttons/SecondaryButton';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import Title from '../Text/Title';
import Divider from '../Text/Divider';
import { oneUnitFlex } from '../../theme';
import { MY_PROFILE } from './SettingsNavigationOptions';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const SettingsScreen = ({ navigation }) => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const [authInfo, setAuthInfo] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [subscriptionInfo, setSubscriptionInfo] = useState({});
  useEffect(() => {
    authSystem.getAuthInfo().then(setAuthInfo);
  }, []);
  useEffect(() => {
    if (!authInfo.email) return;
    userSystem.getUserInfoFrom(authInfo.email).then(setUserInfo);
    userSystem.getSubscriptionInfoFrom(authInfo.email).then(setSubscriptionInfo);
  }, [authInfo]);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Title text="Settings" />
      <SecondaryButton
        title={t('My Profile')}
        onPress={() => navigation.navigate(MY_PROFILE, { userInfo, subscriptionInfo })}
      />
      <LanguageChooser />
      <Divider />
      <SecondaryButton title={t('Log out')} onPress={() => authSystem.logOut()} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
});

export default SettingsScreen;
