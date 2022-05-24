import {
  FlatList, Text, View, StyleSheet,
} from 'react-native';
import {
  useState, useEffect, useContext, useCallback
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import SongInList from './SongInList';
import {
  oneUnitFlex, headerTitle,
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import InlineSongPlayer from './InlineSongPlayer';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';

const SongsList = () => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const [songsList, setSongsList] = useState(new SongReproductionList([]));
  const [currentlyPlayingID, setCurrentlyPlayingID] = useState('');
  useEffect(() => {
    songsSystem.initialize();
  }, []);

  useFocusEffect(
    useCallback(() => {
      songsSystem.getSongs().then((songs) => setSongsList(new SongReproductionList(songs)));
    }, []),
  );
  useEffect(() => {
    (async () => {
      try {
        await songsSystem.play(currentlyPlayingID);
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    })();
  }, [currentlyPlayingID]);

  return (
    <>
      <View style={playlistStyle.container}>
        <Text style={playlistStyle.playlistTitle}>{t('My favorite songs')}</Text>
        <FlatList
          data={songsList.songs}
          renderItem={({ item }) => {
            const song = item;
            return (
              <SongInList
                song={song}
                isPlaying={currentlyPlayingID === song.id}
                setCurrentlyPlayingID={setCurrentlyPlayingID}
              />
            );
          }}
          keyExtractor={(song) => song.id}
        />
      </View>
      {currentlyPlayingID ? (
        <InlineSongPlayer
          songsList={songsList}
          currentlyPlayingID={currentlyPlayingID}
          setCurrentlyPlayingID={setCurrentlyPlayingID}
        />
      ) : null}
    </>
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
