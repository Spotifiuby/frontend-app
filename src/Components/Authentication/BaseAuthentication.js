import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import propTypes from 'prop-types';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthenticationOptions from './AuthenticationOptions';
import { INIT_AUTH_FORM, LOGIN_FORM, REGISTER_FORM } from './AuthenticationFormTypes';
import TransparentBackgroundNavitatorTheme from '../CommonNavigation/TransparentBackgroundNavitatorTheme';

const AuthOptionsStack = createNativeStackNavigator();

const BaseAuthentication = ({ setAuthInformation }) => {
  return (
    <NavigationContainer theme={TransparentBackgroundNavitatorTheme}>
      <AuthOptionsStack.Navigator
        initialRouteName={INIT_AUTH_FORM}
        screenOptions={{ headerShown: false }}
      >
        <AuthOptionsStack.Screen
          name={INIT_AUTH_FORM}
          component={AuthenticationOptions}
          initialParams={{ setAuthInformation }}
        />
        <AuthOptionsStack.Screen name={LOGIN_FORM} component={LoginForm} />
        <AuthOptionsStack.Screen name={REGISTER_FORM} component={RegisterForm} />
      </AuthOptionsStack.Navigator>
    </NavigationContainer>

  );
};

BaseAuthentication.propTypes = {
  setAuthInformation: propTypes.func.isRequired,
};

export default BaseAuthentication;
