import {
  FlatList, Text, View, StyleSheet, Image, Dimensions, Pressable,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Audio } from 'expo-av';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { buildEndpointFor, jsonFrom, getFrom } from '../SpotifiubySystem/fetch-helpers';
import SongInList from './SongInList';
import {
  oneUnitFlex, headerTitle, secondaryText, textColor, crossCentered,
} from '../../theme';
import SystemContext from '../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';

const soundObject = new Audio.Sound();

const InlineSongPlayer = ({ songs, currentlyPlayingID, setCurrentlyPlayingID }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const songIndex = songs.findIndex((song) => song.id === currentlyPlayingID);
  if (songIndex === -1) return null;
  const { id, name, artists } = songs[songIndex];
  return (
    <View style={styles.playerContainer}>

      <View style={{ ...crossCentered, flexDirection: 'row', marginBottom: 5 }}>
        <Image
          source={{
            uri: buildEndpointFor('songs', id, 'cover'),
          }}
          style={styles.songImage}
          accessibilityLabel={t('Spotifiuby logo image')}
        />
        <Pressable onPress={() => setCurrentlyPlayingID(songs[songIndex - 1].id)}>
          <AntDesign name="fastbackward" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => setCurrentlyPlayingID('')}>
          <Ionicons name="pause" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => setCurrentlyPlayingID(songs[songIndex + 1].id)} >
          <AntDesign name="fastforward" size={24} color="black" />
        </Pressable>

        {/* <CTAButton title="<" disabled={songIndex <= 0} /> */}
        {/* <CTAButton title="Pause"  /> */}
        {/* <CTAButton title=">"  disabled={songIndex > songs.length - 1}/> */}
      </View>
      <View style={styles.songInfoTextContainer}>
        <Text
          style={styles.songTitle}
          numberOfLines={1}
          ellipsisMode="clip"
        >
          {name}
        </Text>
        <Text style={styles.songArtist}>{artists.join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: '#222',
    paddingVertical: 10,
  },
  songArtist: secondaryText,
  songImage: {
    height: 60,
    marginRight: 15,
    width: 60,
  },
  songInfoTextContainer: {
    ...textColor,
    marginLeft: 15,
  },
  songTitle: {
    ...textColor,
    ...oneUnitFlex,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
  },
});

const SongsList = () => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const [songs, setSongs] = useState([]);
  const [currentlyPlayingID, setCurrentlyPlayingID] = useState('');
  useEffect(() => {
    jsonFrom(getFrom(buildEndpointFor('songs-api', 'songs'))).then(setSongs);
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
      {currentlyPlayingID ? (
        <InlineSongPlayer
          songs={songs}
          currentlyPlayingID={currentlyPlayingID}
          setCurrentlyPlayingID={setCurrentlyPlayingID}
        />
      ) : null}
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
