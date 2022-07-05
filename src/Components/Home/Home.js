import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Pressable,
  SafeAreaView
} from 'react-native';
import {
  useContext, useCallback, useState, useEffect,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  crossCentered,
  headerTitle,
  mainCentered,
  oneUnitFlex,
  secondaryText,
  textColor
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongsList from '../Songs/SongsList';
import Title from '../Text/Title';
import { ALBUM_PROFILE } from '../Uploader/UploadNavigationOptions';
import CoverPicture from '../Songs/CoverPicture';

const Home = ({navigation, _}) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const [songsList, setSongsList] = useState(new SongReproductionList([]));
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    songsSystem.initialize();
    setSongsList(new SongReproductionList([]));
    setAlbums([]);
  }, []);

  useFocusEffect( () => {
    songsSystem.getSongs().then((songs) => {
      setSongsList(new SongReproductionList(songs.slice(5, songs.length)));
    });
    }
  );

  useFocusEffect(
    useCallback(() => {
      songsSystem.getAlbums()
        .then((albumsResult) => {
          const slice = albumsResult.slice(0, 5);
          console.log(slice);
          setAlbums(slice);
        });
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title text="My favorite songs" />
      {(songsList.songs.length !== 0)
        ? <SongsList songsList={songsList} />
        : null}
      <Title text="My favorite albums" />
      {(albums.length > 0)
        ? (
          <>
              <FlatList
                data={albums}
                renderItem={({ item, index }) => {
                  const { name, id } = item;
                  const artists = item.artists.join(', ');
                  return (
                    <Pressable key={id} style={styles.albumPressable} onPress={() => {
                      navigation.navigate(ALBUM_PROFILE, { album:item });
                    }}>
                      <View style={styles.albumImage}>
                        <CoverPicture album={item}/>
                      </View>
                      <View style={styles.albumInfo}>
                        <Text style={styles.albumName}>{name}</Text>
                        <Text style={styles.albumArtistName}>{artists}</Text>
                      </View>
                    </Pressable>
                  );
                }}
                keyExtractor={(artist) => artist.id}
              />
          </>
        )
        : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  albumImage: {
    height: 60,
    width: 60,
  },
  albumPressable: {
    ...crossCentered,
    flexDirection: 'row',
    marginVertical: 11,
  },
  albumInfo: {
    flexDirection: 'column',
  },
  albumName: {
    ...textColor,
    ...mainCentered,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  albumArtistName: {
    ...secondaryText,
    marginLeft: 15
  },
  resultsContainer: {
    //...oneUnitFlex,
    // justifyContent: 'flex',
  },
  sectionTitle: {
    ...headerTitle,
    marginBottom: 5,
    marginTop: 10,
  },
});

export default Home;
