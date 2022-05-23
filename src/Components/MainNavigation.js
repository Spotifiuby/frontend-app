import { useCallback, useContext } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import propTypes from 'prop-types';
import SettingsScreen from './Settings/SettingsScreen';
import SongsList from './Songs/SongsList';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import theme from '../theme';
import { UPLOADER_USER } from '../SpotifiubySystem/UserSystem/UserSystem';

const Tab = createBottomTabNavigator();

const MainNavigation = ({ userType }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const HomeIcon = useCallback(({ color, size }) => <Ionicons name="home" color={color} size={size} />, []);
  const SettingsIcon = useCallback(({ color, size }) => <Ionicons name="settings" color={color} size={size} />, []);
  const UploadIcon = useCallback(({ color, size }) => <Entypo name="squared-plus" color={color} size={size} />, []);
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={t('Home')}
          component={SongsList}
          options={{ tabBarIcon: HomeIcon }}
        />
        {userType === UPLOADER_USER
          ? (
            <Tab.Screen
              name={t('Upload')}
              component={SongsList}
              options={{ tabBarIcon: UploadIcon }}
            />
          )
          : null}
        <Tab.Screen
          name={t('Settings')}
          component={SettingsScreen}
          options={{ tabBarIcon: SettingsIcon }}
        />
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
    background: theme.color.background,
    primary: theme.color.primary,
    text: theme.color.foreground,
  },
};

export default MainNavigation;
