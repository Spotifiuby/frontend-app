import {View, StyleSheet, ScrollView} from 'react-native';
import {
  useContext, useCallback, useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { oneUnitFlex } from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongsList from '../Songs/SongsList';
import Title from '../Text/Title';

const Home = () => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const [songsList, setSongsList] = useState(new SongReproductionList([]));

  useFocusEffect(
    useCallback(() => {
      songsSystem.getSongs()
        .then((songs) => setSongsList(new SongReproductionList(songs.slice(5, songs.length))));
    }, []),
  );
  return (
    <ScrollView style={playlistStyle.container}>
      <Title text="My favorite songs" />
      {(songsList.songs.length !== 0)
        ? <SongsList songsList={songsList} />
        : null}
      <Title text="Los albums que te gustaron" />
      {(songsList.songs.length !== 0)
        ? <SongsList songsList={songsList} />
        : null}
    </ScrollView>
  );
};

const playlistStyle = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
});

export default Home;
