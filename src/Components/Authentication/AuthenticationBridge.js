import { View, StyleSheet } from 'react-native';
import { useEffect, useContext } from 'react';
import {
  oneUnitFlex, fullWidth,
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import { INVALID_USER, UNDEFINED_USER } from '../../SpotifiubySystem/UserSystem/UserSystem';
import SecondStepRegistration from '../UserProfile/SecondStepRegistration';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import ConnectionErrorScreen from '../Errors/ConnectionErrorScreen';

// eslint-disable-next-line react/prop-types
const AuthenticationBridge = ({ children, userType, setUserType }) => {
  const system = useContext(SystemContext);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  useEffect(() => {
    userSystem.userType().then(setUserType);
  }, []);

  useEffect(() => {
    if (userType === INVALID_USER) {
      authSystem.logOut();
    }
  }, [userType]);
  return (
    <View style={styles.container}>
      {(userType === UNDEFINED_USER) ? <SecondStepRegistration setUserType={setUserType} /> : null}
      {(userType === INVALID_USER) ? <ConnectionErrorScreen /> : null}
      {(userSystem.isValid(userType)) ? children : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    ...fullWidth,
  },
});

export default AuthenticationBridge;
