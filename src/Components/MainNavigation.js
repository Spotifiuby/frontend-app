import { useCallback, useContext } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import propTypes from 'prop-types';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import theme from '../theme';
import { UPLOADER_USER } from '../SpotifiubySystem/UserSystem/UserSystem';
import SongUploader from './Uploader/SongUploader';
import SearchScreen from './Search/SearchScreen';
import Home from './Home/Home';
import SettingsNavigation from './Settings/SettingsNavigation';

const Tab = createBottomTabNavigator();

const MainNavigation = ({ userType }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
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
      component={Home}
      options={{ tabBarIcon: HomeIcon }}
    />
  );
};

const SearchTabScreen = (t) => {
  const SearchIcon = useCallback(({ color, size }) => <FontAwesome name="search" size={size} color={color} />, []);
  return (
    <Tab.Screen
      name={t('Search')}
      component={SearchScreen}
      options={{ tabBarIcon: SearchIcon }}
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
          component={SongUploader}
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
