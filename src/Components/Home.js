import { View, StyleSheet } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import {
  oneUnitFlex, fullWidth,
} from '../theme';
import MainNavigation from './MainNavigation';
import SystemContext from './SpotifiubySystem/DefaultSystemContext';
import UserSystemInterface from './SpotifiubySystem/UserSystem/UserSystemInterface';
import { UNDEFINED_USER } from './SpotifiubySystem/UserSystem/UserSystem';
import SecondStepRegistration from './Authentication/SecondStepRegistration';

const Home = () => {
  const system = useContext(SystemContext);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const [userType, setUserType] = useState('');
  useEffect(() => {
    userSystem.userType().then(setUserType);
  }, []);
  return (
    <View style={homeStyle.container}>
      {(userType === UNDEFINED_USER)
        ? <SecondStepRegistration />
        : <MainNavigation />}
    </View>
  );
};

const homeStyle = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    ...fullWidth,
  },
});

export default Home;
