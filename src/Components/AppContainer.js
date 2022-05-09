import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import {
  backgroundColor, crossCentered, oneUnitFlex, textColor,
} from '../theme';
import Authentication from './Authentication/Authentication';
import Home from './Home';

const AppContainer = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // console.log(auth);
    // createUserWithEmailAndPassword(auth, 'agustin427more@gmail.com', 'foofato')
    //   .then((userCredential) => {
    //     // Signed in
    //     // const user = userCredential.user;
    //     console.log(userCredential);
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     // ..
    //   });
    // // const subscriber = onAuthStateChanged((user) => {
    // //   console.log(user);
    // //   setToken(user);
    // // });
    // // return subscriber;
  }, []);

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
