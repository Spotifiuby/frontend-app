import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useContext } from 'react';
import {
  backgroundColor, oneUnitFlex,
} from '../theme';
import BaseAuthentication from './Authentication/BaseAuthentication';
import AuthenticationBridge from './Authentication/AuthenticationBridge';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import AuthSystemInterface from '../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import AuthorizedAppContent from './AuthorizedAppContent';

const AppContainer = () => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  system.systemImplementing(TranslationSystemInterface).initialize();
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const [userType, setUserType] = useState('');

  authSystem.useAuthentication(setIsAuthenticated);
  if (isAuthenticated === '') return null;
  return (
    <View style={styles.container}>
      {
        !isAuthenticated
          ? <BaseAuthentication />
          : (
            <AuthenticationBridge userType={userType} setUserType={setUserType}>
              <AuthorizedAppContent userType={userType} />
            </AuthenticationBridge>
          )
      }
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    ...backgroundColor,
    paddingTop: 10,
  },
});

export default AppContainer;
