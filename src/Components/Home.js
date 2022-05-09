import { View, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme, {
  oneUnitFlex, fullWidth,
} from '../theme';
import SettingsScreen from './Settings/SettingsScreen';
import SongsList from './Songs/SongsList';

const Tab = createBottomTabNavigator();
const Home = () => {
  const { t } = useTranslation();
  const HomeIcon = useCallback(({ color, size }) => <Ionicons name="home" color={color} size={size} />, []);
  const SettingsIcon = useCallback(({ color, size }) => <Ionicons name="settings" color={color} size={size} />, []);
  return (
    <View style={homeStyle.container}>
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

    </View>
  );
};

const homeStyle = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    ...fullWidth,
  },
});

const navigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    background: theme.color.background,
    primary: theme.color.primary,
    text: theme.color.foreground,
  },
};

export default Home;
