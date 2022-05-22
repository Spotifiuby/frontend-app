import { useCallback, useContext } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import SettingsScreen from './Settings/SettingsScreen';
import SongsList from './Songs/SongsList';
import SystemContext from './SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from './SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import theme from '../theme';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const HomeIcon = useCallback(({ color, size }) => <Ionicons name="home" color={color} size={size} />, []);
  const SettingsIcon = useCallback(({ color, size }) => <Ionicons name="settings" color={color} size={size} />, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={t('Home')}
          component={SongsList}
          options={{ tabBarIcon: HomeIcon }}
        />
        <Tab.Screen
          name={t('Settings')}
          component={SettingsScreen}
          options={{ tabBarIcon: SettingsIcon }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
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
