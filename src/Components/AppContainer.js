import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import {
  backgroundColor, oneUnitFlex,
} from '../theme';
import BaseAuthentication from './Authentication/BaseAuthentication';
import Home from './Home';
import TranslationSystemInterface from './SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import SystemContext from './SpotifiubySystem/DefaultSystemContext';
import AuthSystemInterface from './SpotifiubySystem/AuthSystem/AuthSystemInterface';

const AppContainer = () => {
  const system = useContext(SystemContext);
  const [authInformation, setAuthInformation] = useState({});
  system.systemImplementing(TranslationSystemInterface).use();
  useEffect(() => {
    system.systemImplementing(AuthSystemInterface).getAuthInfo().then(setAuthInformation);
  }, []);
  return (
    <View style={styles.container}>
      {
        !authInformation.token
          ? <BaseAuthentication setAuthInformation={setAuthInformation} />
          : <Home authInformation={authInformation} />
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
