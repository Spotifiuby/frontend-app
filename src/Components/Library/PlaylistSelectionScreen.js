import {
  Text,
  View,
  StyleSheet,
  SafeAreaView, Dimensions, FlatList,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { useCallback, useContext, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface
  from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import useTranslation
  from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import Title from '../Text/Title';
import {
  crossCentered,
  mainCentered, oneUnitFlex,
  secondaryText,
  textColor,
} from '../../theme';
import CoverPicture from '../Songs/CoverPicture';
import CTAButton from '../Buttons/CTAButton';
import Song from '../../SpotifiubySystem/SongsSystem/Song';
import useNotificationSystem
  from '../../SpotifiubySystem/NotificationSystem/useNotificationSystem';

const PlaylistSelectionScreen = (props) => {
  const system = useContext(SystemContext);
  const { t } = useTranslation();
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState({});
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const navigation = useNavigation();
  const notificationSystem = useNotificationSystem();
  const createPlaylistAction = () => {
    const payload = { name: props.route.params.playlistName, songs: Object.keys(selectedSongs) };
    songsSystem.createFullPlaylist(payload)
      .then(() => {
        notificationSystem.show(t('Playlist created successfully'));
        navigation.navigate(t('Library'));
      });
  };
  useFocusEffect(
    useCallback(() => {
      songsSystem.getSongs()
        .then((songsResult) => {
          setSongs(songsResult);
        });
    }, []),
  );
  const handleChange = (id) => {
    const temp = songs.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setSongs(temp);
    const newSelectedSongs = selectedSongs;
    if (newSelectedSongs[id]) {
      delete newSelectedSongs[id];
    } else {
      newSelectedSongs[id] = true;
    }
    setSelectedSongs(newSelectedSongs);
    console.log(newSelectedSongs);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.albumImage}>
        <CoverPicture />
      </View>
      <Text style={styles.albumName}>{props.route.params.playlistName}</Text>
      <CTAButton
        onPress={() => createPlaylistAction()}
        title={t('Confirm')}
        accessibilityLabel={t('Confirm playlist button')}
        disabled={Object.keys(selectedSongs).length === 0}
      />
      <Title text="Select songs" />
      {songs.length > 0
      && (
      <FlatList
        data={songs}
        renderItem={({ item }) => {
          const song = new Song(item);
          return (
            <View style={styles.songInfoContainer}>
              <CheckBox
                style={styles.checkBox}
                value={item.isChecked}
                onValueChange={() => {
                  handleChange(song.id);
                }}
              />
              <View style={styles.songImage}>
                <CoverPicture song={song} />
              </View>
              <View style={styles.songInfoTextContainer}>
                <Text
                  style={styles.songTitle}
                  numberOfLines={1}
                  ellipsisMode="clip"
                >
                  {song.title}
                </Text>
                <Text
                  style={styles.songArtist}
                >
                  {song.artistsDisplayableForm()}
                </Text>
              </View>
            </View>
          );
        }}
      />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  albumImage: {
    alignSelf: 'center',
    height: 110,
    marginTop: 10,
    width: 110,
  },
  albumName: {
    ...textColor,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  checkBox: {
    marginLeft: 10,
    marginRight: 20,
  },
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  songArtist: {
    ...secondaryText,
  },
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
    ...mainCentered,
    marginLeft: 15,
  },
  songTitle: {
    ...textColor,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
  },
});

export default PlaylistSelectionScreen;
