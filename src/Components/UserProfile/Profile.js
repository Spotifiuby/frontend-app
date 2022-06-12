import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import { oneUnitFlex, textColor } from '../../theme';
import CTAButton from '../Buttons/CTAButton';
import FormField from '../Inputs/FormField';
import { EDIT_USER_PROFILE } from '../Settings/SettingsNavigationOptions';
import Title from '../Text/Title';

/* eslint-disable react/prop-types */
const Profile = ({ navigation, route }) => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const [authInfo, setAuthInfo] = useState('');
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const { userInfo } = route.params;
  const currentUserEmail = authInfo.email;

  useEffect(() => {
    authSystem.getAuthInfo().then(setAuthInfo);
  }, []);

  if (!userInfo.email) return null;
  return (
    <View style={styles.container}>
      <Title text="Profile" />
      <FormField label={t('Email')}>
        <Text style={styles.userInfo}>{userInfo.email}</Text>
      </FormField>
      <FormField label={t('First Name')}>
        <Text style={styles.userInfo}>{userInfo.first_name}</Text>
      </FormField>
      <FormField label={t('Last Name')}>
        <Text style={styles.userInfo}>{userInfo.last_name}</Text>
      </FormField>
      <FormField label={t('User type')}>
        <Text style={styles.userInfo}>{t(userInfo.user_type)}</Text>
      </FormField>
      {userInfo.email === currentUserEmail
        ? <CTAButton title="Editar" onPress={() => navigation.navigate(EDIT_USER_PROFILE, { userInfo })} />
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  userInfo: {
    ...textColor,
    fontSize: 20,
    paddingBottom: 30,
  },
});

export default Profile;
