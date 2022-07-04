import {
  View, StyleSheet, ScrollView, TouchableHighlight,
} from 'react-native';
import {
  useContext, useCallback, useState,
} from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import Title from '../Text/Title';
import SongsSystemInterface
  from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import styles from './styles';
import PlaylistsList from '../Playlists/PlaylistsList';

const MyLibraryNavigation = () => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const [playlists, setPlaylists] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      songsSystem.playlistsFilteredBy()
        .then((result) => setPlaylists(result));
    }, []),
  );
  return (
    <ScrollView style={styles.container}>
      <Title text="My playlists" />
      <TouchableHighlight style={styles.createPlaylist} onPress={() => navigation.navigate('Create Playlist')}>
        {/* <Text>{title}</Text> */}
        <AntDesign name="plus" size={24} color="white" />
      </TouchableHighlight>
      {playlists.length !== 0 && <PlaylistsList playlists={playlists} />}
    </ScrollView>
  );
};

export default MyLibraryNavigation;
