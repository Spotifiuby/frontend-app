import { useCallback } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import propTypes from 'prop-types';
import theme from '../theme';
import { UPLOADER_USER } from '../SpotifiubySystem/UserSystem/UserSystem';
import { UploaderNavigation } from './Uploader/UploaderScreen';
import SettingsNavigation from './Settings/SettingsNavigation';
import useTranslation from '../SpotifiubySystem/TranslationSystem/useTranslation';
import ChatsNavigation from './Chats/ChatsNavigation';
import SearchNavigation from './Search/SearchNavigation';
import MyLibraryStack from "./Library/MyLibraryStack";
import HomeNavigation from './Home/HomeNavigation';

const Tab = createBottomTabNavigator();

const MainNavigation = ({ userType }) => {
  const { t } = useTranslation();
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        theme={navigationTheme}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: navigationTheme.colors.background },
        }}
      >
        {HomeTabScreen(t)}
        {SearchTabScreen(t)}
        {ChatsTabScreen(t)}
        {MyLibraryTabScreen(t)}
        {UploadTabScreen(userType, t)}
        {SettingsTabScreen(t)}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

MainNavigation.propTypes = {
  userType: propTypes.string.isRequired,
};

const navigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    background: theme.color.navigationBarColor,
    primary: theme.color.primary,
    text: theme.color.foreground,
  },
};

const HomeTabScreen = (t) => {
  const HomeIcon = useCallback(({ color, size }) => <Entypo name="home" color={color} size={size} />, []);
  return (
    <Tab.Screen
      name={t('Home')}
      component={HomeNavigation}
      options={{ tabBarIcon: HomeIcon }}
    />
  );
};

const SearchTabScreen = (t) => {
  const SearchIcon = useCallback(({ color, size }) => <FontAwesome name="search" size={size} color={color} />, []);
  return (
    <Tab.Screen
      name={t('Search')}
      component={SearchNavigation}
      options={{ tabBarIcon: SearchIcon }}
    />
  );
};

const MyLibraryTabScreen = (t) => {
  const LibraryIcon = useCallback(({ color, size }) => <Ionicons name="library" size={size} color={color} />, []);
  return (
    <Tab.Screen
      name={t('Library')}
      component={MyLibraryStack}
      options={{ tabBarIcon: LibraryIcon }}
    />
  );
};

const ChatsTabScreen = (t) => {
  const ChatsIcon = useCallback(({ color, size }) => <Entypo name="message" size={size} color={color} />, []);
  return (
    <Tab.Screen
      name={t('Chats')}
      component={ChatsNavigation}
      options={{ tabBarIcon: ChatsIcon }}
    />
  );
};

const UploadTabScreen = (userType, t) => {
  const UploadIcon = useCallback(({ color, size }) => <Entypo name="squared-plus" color={color} size={size} />, []);
  return (
    (userType === UPLOADER_USER)
      ? (
        <Tab.Screen
          name={t('Upload')}
          component={UploaderNavigation}
          options={{ tabBarIcon: UploadIcon }}
        />
      )
      : null
  );
};

const SettingsTabScreen = (t) => {
  const SettingsIcon = useCallback(({ color, size }) => <Ionicons name="settings-sharp" color={color} size={size} />, []);
  return (
    <Tab.Screen
      name={t('Settings')}
      component={SettingsNavigation}
      options={{ tabBarIcon: SettingsIcon }}
    />
  );
};

export default MainNavigation;
