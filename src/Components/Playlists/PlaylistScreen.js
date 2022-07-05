import { View, StyleSheet, ScrollView } from 'react-native';
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

const PlaylistScreen = (props) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const [playlist, setPlaylist] = useState({ });
  const [songsList, setSongsList] = useState(new SongReproductionList([]));

  useFocusEffect(
    useCallback(() => {
      const { playlistId } = props.route.params;
      console.log(playlistId);
      songsSystem.getPlaylistById(playlistId)
        .then((result) => {
          console.log(result);
          setPlaylist(result);
        });
      songsSystem.getPlaylistSongsFilteredBy(playlistId)
        .then((songs) => {
          console.log(songs);
          setSongsList(new SongReproductionList(songs));
        });
    }, []),
  );
  return (
    <ScrollView style={playlistStyle.container}>
      <Title text={playlist.name} />
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

export default PlaylistScreen;
