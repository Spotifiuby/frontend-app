import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import {
  backgroundColor, crossCentered, oneUnitFlex, textColor,
} from '../theme';
import Authentication from './Authentication/Authentication';
import Home from './Home';

const AppContainer = () => {
  const [token, setToken] = useState('');
  return (
    <View style={styles.container}>
      {
        (!token)
          ? <Authentication setToken={setToken} />
          : <Home />
      }
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    ...crossCentered,
    ...textColor,
    ...backgroundColor,
    paddingTop: 10,
  },
});

export default AppContainer;
