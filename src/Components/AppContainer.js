import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useState } from 'react';
import {
  backgroundColor, crossCentered, oneUnitFlex, textColor,
} from '../theme';
import Login from './Login';
import Home from './Home';

const AppContainer = () => {
  const [token, setToken] = useState('');

  return (
    <View style={styles.container}>
      {
        (!token)
          ? <Login setToken={setToken} />
          : <SafeAreaView><Home /></SafeAreaView>
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
  },
});

export default AppContainer;
