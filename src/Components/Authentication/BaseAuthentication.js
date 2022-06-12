import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthenticationOptions from './AuthenticationOptions';
import { INIT_AUTH_FORM, LOGIN_FORM, REGISTER_FORM } from './AuthenticationFormTypes';
import TransparentBackgroundNavitatorTheme from '../CommonNavigation/TransparentBackgroundNavitatorTheme';

const AuthOptionsStack = createNativeStackNavigator();

const BaseAuthentication = () => {
  return (
    <NavigationContainer theme={TransparentBackgroundNavitatorTheme}>
      <AuthOptionsStack.Navigator
        initialRouteName={INIT_AUTH_FORM}
        screenOptions={{ headerShown: false }}
      >
        <AuthOptionsStack.Screen
          name={INIT_AUTH_FORM}
          component={AuthenticationOptions}
        />
        <AuthOptionsStack.Screen name={LOGIN_FORM} component={LoginForm} />
        <AuthOptionsStack.Screen name={REGISTER_FORM} component={RegisterForm} />
      </AuthOptionsStack.Navigator>
    </NavigationContainer>

  );
};

export default BaseAuthentication;
