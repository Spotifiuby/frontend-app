import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../UserProfile/Profile';
import {
  ALBUM_PROFILE,
  ARTIST_PROFILE,
  SEARCH_MENU,
  USER_PROFILE
} from './SearchNavigationOptions';
import SearchScreen from './SearchScreen';
import ArtistProfile from '../Uploader/ArtistProfile';
import AlbumProfile from '../Albums/AlbumProfile';

const Stack = createNativeStackNavigator();
const SearchNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SEARCH_MENU}>
      <Stack.Screen name={SEARCH_MENU} component={SearchScreen} />
      <Stack.Screen name={USER_PROFILE} component={Profile} />
      <Stack.Screen name={ARTIST_PROFILE} component={ArtistProfile} />
      <Stack.Screen name={ALBUM_PROFILE} component={AlbumProfile} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
