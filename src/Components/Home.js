import {
  FlatList, Text, View, Image, StyleSheet, Pressable,
} from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Audio } from 'expo-av';
import { buildEndpointFor, fetchJsonFrom, getFrom } from '../fetch-helpers';
import theme, { crossCentered, textColor, secondaryText } from '../theme';

const soundObject = new Audio.Sound();

const Home = () => {
  const { t } = useTranslation();
  const [songs, setSongs] = useState([]);
  const [currentlyPlayingID, setCurrentlyPlayingID] = useState('');
  fetchJsonFrom(getFrom(buildEndpointFor('songs'))).then(setSongs);
  // TODO: Refactorizar esto
  return (
    <>
      <Text style={playlistStyle.playlistTitle}>{t('My favorite songs')}</Text>
      <FlatList
        data={songs}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={playlistStyle.songInfoContainer}
              onPress={
                async () => {
                  await soundObject.unloadAsync();
                  if (currentlyPlayingID === item.id) {
                    setCurrentlyPlayingID('');
                    return;
                  }
                  await soundObject.loadAsync({ uri: buildEndpointFor('songs', item.id, 'content') });
                  soundObject.playAsync();
                  setCurrentlyPlayingID(item.id);
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
    </>
  );
};

const playlistStyle = StyleSheet.create({
  playlistTitle: {
    ...textColor,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
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

export default Home;
