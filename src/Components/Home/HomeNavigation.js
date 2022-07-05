import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ALBUM_PROFILE, HOME_SCREEN } from './HomeNavigationOptions';
import Home from './Home';
import AlbumProfile from '../Albums/AlbumProfile';

const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={HOME_SCREEN}>
      <Stack.Screen name={HOME_SCREEN} component={Home} />
      <Stack.Screen name={ALBUM_PROFILE} component={AlbumProfile} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
