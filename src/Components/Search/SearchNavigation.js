import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../UserProfile/Profile';
import { SEARCH_MENU, USER_PROFILE } from './SearchNavigationOptions';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();
const SearchNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SEARCH_MENU}>
      <Stack.Screen name={SEARCH_MENU} component={SearchScreen} />
      <Stack.Screen name={USER_PROFILE} component={Profile} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
