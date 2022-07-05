import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyLibraryNavigation from './MyLibraryNavigation';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import PlaylistScreen from '../Playlists/PlaylistScreen';
import CreatePlaylistScreen from './CreatePlaylistScreen';
import PlaylistSelectionScreen from './PlaylistSelectionScreen';

const Stack = createNativeStackNavigator();
const MyLibraryStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      initialRoutName={t('Library')}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={t('Library')} component={MyLibraryNavigation} />
      <Stack.Screen name={t('Playlist')} component={PlaylistScreen} />
      <Stack.Screen name={t('Create Playlist')} component={CreatePlaylistScreen} />
      <Stack.Screen name={t('Playlist Songs Selection')} component={PlaylistSelectionScreen} />
    </Stack.Navigator>
  );
};
export default MyLibraryStack;
