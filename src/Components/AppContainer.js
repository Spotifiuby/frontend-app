import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import {
  backgroundColor, oneUnitFlex,
} from '../theme';
import BaseAuthentication from './Authentication/BaseAuthentication';
import Home from './Home';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import AuthSystemInterface from '../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import UserSystemInterface from '../SpotifiubySystem/UserSystem/UserSystemInterface';
import { INVALID_USER } from '../SpotifiubySystem/UserSystem/UserSystem';

const AppContainer = () => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const [authInformation, setAuthInformation] = useState({});
  system.systemImplementing(TranslationSystemInterface).initialize();

  useEffect(() => {
    authSystem.getAuthInfo().then(setAuthInformation);
  }, []);

  useEffect(() => {
    (async () => {
      if (await userSystem.userType() === INVALID_USER) {
        system.systemImplementing(AuthSystemInterface).logOut();
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      {
        !authInformation.token
          ? <BaseAuthentication setAuthInformation={setAuthInformation} />
          : <Home />
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
