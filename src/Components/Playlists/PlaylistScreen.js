import {View, StyleSheet, ScrollView} from 'react-native';
import {
  useContext, useCallback, useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import propTypes from 'prop-types';
import { oneUnitFlex } from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongsList from '../Songs/SongsList';
import Title from '../Text/Title';

const PlaylistScreen = ({ playlistId }) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const [songsList, setSongsList] = useState(new SongReproductionList([]));

  useFocusEffect(
    useCallback(() => {
      console.log(playlistId);
      songsSystem.getPlaylistSongsFilteredBy(playlistId)
        .then((songs) => {
          console.log(songs);
          setSongsList(new SongReproductionList(songs));
        });
    }, []),
  );
  return (
    <ScrollView style={playlistStyle.container}>
      <Title text="My favorite songs" />
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

PlaylistScreen.propTypes = {
  playlistId: propTypes.string.isRequired,
};

export default PlaylistScreen;
