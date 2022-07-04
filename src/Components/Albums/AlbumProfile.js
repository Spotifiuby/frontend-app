import { StyleSheet, Text, View } from 'react-native';
import { oneUnitFlex, secondaryText, textColor } from '../../theme';
import CoverPicture from '../Songs/CoverPicture';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useSongsSystem from '../../SpotifiubySystem/SongsSystem/useSongsSystem';
import SongsList from '../Songs/SongsList';

const AlbumProfile = ({
  _,
  route
}) => {
  const { album } = route.params;
  const songsSystem = useSongsSystem();
  const [songsList, setSongsList] = useState(new SongReproductionList([]));

  useFocusEffect(
    useCallback(() => {
      songsSystem.getSongsByAlbum(album.id).then((songs) => setSongsList(new SongReproductionList(songs)));
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.albumImage}>
        <CoverPicture album={album}/>
      </View>
      <Text style={styles.albumName}>{album.name}</Text>
      <Text style={styles.artistName}>{album.artists.join(', ')}</Text>

      {(songsList.songs.length !== 0)
        ? (
          <>
            <SongsList songsList={songsList} showArtist={false}/>
          </>
        )
        : null}

    </View>
  );
};

export default AlbumProfile;

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  albumImage: {
    height: 110,
    width: 110,
    alignSelf: 'center',
    marginTop: 10,
  },
  albumName: {
    ...textColor,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  artistName: {
    ...secondaryText,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
});
