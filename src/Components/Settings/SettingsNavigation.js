import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../UserProfile/Profile';
import SettingsScreen from './SettingsScreen';
import { EDIT_USER_PROFILE, MY_PROFILE, SETTINGS_MENU } from './SettingsNavigationOptions';
import EditProfile from '../UserProfile/EditProfile';

const Stack = createNativeStackNavigator();
const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SETTINGS_MENU}>
      <Stack.Screen name={SETTINGS_MENU} component={SettingsScreen} />
      <Stack.Screen name={MY_PROFILE} component={Profile} />
      <Stack.Screen name={EDIT_USER_PROFILE} component={EditProfile} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
