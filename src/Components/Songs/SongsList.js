import {
  FlatList, Text, View, StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { useTranslation } from 'react-i18next';
import { buildEndpointFor, jsonFrom, getFrom } from '../../fetch-helpers';
import SongInList from './SongInList';
import {
  oneUnitFlex, headerTitle,
} from '../../theme';

const soundObject = new Audio.Sound();

const SongsList = () => {
  const { t } = useTranslation();
  const [songs, setSongs] = useState([]);
  const [currentlyPlayingID, setCurrentlyPlayingID] = useState('');
  useEffect(() => {
    jsonFrom(getFrom(buildEndpointFor('songs'))).then(setSongs);
  }, []);

  useEffect(() => {
    (async () => {
      await soundObject.unloadAsync();
      if (!currentlyPlayingID) return;

      await soundObject.loadAsync({
        uri: buildEndpointFor('songs', currentlyPlayingID, 'content'),
      });
      soundObject.playAsync();
    })();
  }, [currentlyPlayingID]);

  return (
    <View style={playlistStyle.container}>
      <Text style={playlistStyle.playlistTitle}>{t('My favorite songs')}</Text>
      <FlatList
        data={songs}
        renderItem={({ item }) => {
          return (
            <SongInList
              song={item}
              isPlaying={currentlyPlayingID === item.id}
              setCurrentlyPlayingID={setCurrentlyPlayingID}
            />
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
  playlistTitle: headerTitle,
});

export default SongsList;
