import {
  FlatList, Text, View, Image, StyleSheet, Pressable,
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Audio } from 'expo-av';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { buildEndpointFor, fetchJsonFrom, getFrom } from '../fetch-helpers';
import theme, {
  crossCentered, textColor, secondaryText, oneUnitFlex, fullWidth,
} from '../theme';
import LanguageChooser from './LanguageChooser';

const soundObject = new Audio.Sound();

const SongList = () => {
  const { t } = useTranslation();
  const [songs, setSongs] = useState([]);
  const [currentlyPlayingID, setCurrentlyPlayingID] = useState('');
  useEffect(() => {
    fetchJsonFrom(getFrom(buildEndpointFor('songs'))).then(setSongs);
  }, []);

  useEffect(async () => {
    await soundObject.unloadAsync();
    if (!currentlyPlayingID) return;
    await soundObject.loadAsync({
      uri: buildEndpointFor('songs', currentlyPlayingID, 'content'),
    });
    soundObject.playAsync();
  }, [currentlyPlayingID]);
  // TODO: Refactorizar esto

  return (
    <View style={playlistStyle.container}>
      <Text style={playlistStyle.playlistTitle}>{t('My favorite songs')}</Text>
      <FlatList
        data={songs}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={playlistStyle.songInfoContainer}
              onPress={
                () => {
                  setCurrentlyPlayingID(currentlyPlayingID !== item.id ? item.id : '');
                }
              }
            >
              <View>
                <Image
                  source={{
                    uri: buildEndpointFor('songs', item.id, 'cover'),
                  }}
                  style={playlistStyle.songImage}
                  accessibilityLabel={t('Spotifiuby logo image')}
                />
                {currentlyPlayingID === item.id ? <Text style={playlistStyle.songPlayingOverlay}>{t('Playing')}</Text> : null}
              </View>
              <View style={playlistStyle.songInfoTextContainer}>
                <Text style={playlistStyle.songTitle}>{item.name}</Text>
                <Text style={playlistStyle.songArtist}>{item.artist}</Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const playlistStyle = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  playlistTitle: {
    ...textColor,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'left',
  },
  songArtist: secondaryText,
  songImage: {
    height: 60,
    width: 60,
  },
  songInfoContainer: {
    ...crossCentered,
    flexDirection: 'row',
    marginVertical: 11,
  },
  songInfoTextContainer: {
    ...textColor,
    marginLeft: 15,
  },
  songPlayingOverlay: {
    alignItems: 'center',
    backgroundColor: theme.color.overlay,
    color: theme.color.overlayTextColor,
    fontSize: 11,
    height: 60,
    lineHeight: 60,
    position: 'absolute',
    textAlign: 'center',
    // textAlignVertical: 'middle',
    width: 60,
  },
  songTitle: {
    ...textColor,
    fontWeight: 'bold',
  },
});

const SettingsScreen = () => {
  return (
    <View style={playlistStyle.container}>
      <Text style={playlistStyle.playlistTitle}>
        <Trans>Settings</Trans>
      </Text>
      <LanguageChooser />
    </View>
  );
};

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
            component={SongList}
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
