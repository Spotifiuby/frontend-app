/* eslint-disable react/prop-types */

import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import useAuthSystem from '../../SpotifiubySystem/AuthSystem/useAuthSystem';
import useSongsSystem from '../../SpotifiubySystem/SongsSystem/useSongsSystem';
import CTAButton from '../Buttons/CTAButton';
import Title from '../Text/Title';
import { SONG_UPLOADER, ALBUM_CREATOR, ALBUM_PROFILE } from './UploadNavigationOptions';
import {
  crossCentered,
  headerTitle,
  mainCentered,
  oneUnitFlex,
  secondaryText,
  textColor
} from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongsList from '../Songs/SongsList';
import CoverPicture from '../Songs/CoverPicture';

const ArtistProfile = ({ navigation, route }) => {
  const { id } = route.params;
  const songsSystem = useSongsSystem();
  const authSystem = useAuthSystem();
  const [artistInfo, setArtistInfo] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [songsList, setSongsList] = useState(new SongReproductionList([]));
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    songsSystem.infoFromArtistIdentifiedBy(id).then((info) => {
      setArtistInfo(info);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    authSystem.getAuthInfo()
      .then(({ email }) => setCurrentUser(email));
  }, []);

  useFocusEffect(
    useCallback(() => {
      songsSystem.getSongsByArtist(id).then((songs) => setSongsList(new SongReproductionList(songs)));
      songsSystem.getAlbumsByArtist(id).then(setAlbums);
    }, []),
  );

  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator style={{ alignSelf: 'center' }}/>
        : (
          <>
            <View style={styles.textTitle}>
              <Title text={artistInfo.name} />
            </View>
            <ScrollView>
              {(albums.length !== 0)
                ? (
                  <>
                    <Text style={styles.sectionTitle}>{t('Albums')}</Text>
                    <FlatList
                      data={albums}
                      renderItem={({ item }) => {
                        const {
                          name,
                          id
                        } = item;
                        return (
                          <Pressable key={id} style={styles.albumPressable} onPress={() => {
                            navigation.navigate(ALBUM_PROFILE, { album:item });
                          }}>
                            <View style={styles.albumImage}>
                              <CoverPicture album={item}/>
                            </View>
                            <View style={styles.albumInfo}>
                              <Text style={styles.albumName}>{name}</Text>
                            </View>
                          </Pressable>
                        );
                      }}
                      keyExtractor={(artist) => artist.id}
                    />
                  </>
                )
                : null}

              {(songsList.songs.length !== 0)
                ? (
                  <>
                    <Text style={styles.sectionTitle}>{t('Songs')}</Text>
                    <SongsList songsList={songsList} showArtist={false}/>
                  </>
                )
                : null}
            </ScrollView>
            {(artistInfo.user_id === currentUser)
              ? (
                <>
                  <CTAButton style={styles.button}
                    title={t('Add song')}
                    onPress={() => {
                      navigation.navigate(SONG_UPLOADER, { id });
                    }}
                  />
                  <CTAButton style={styles.button}
                    title={t('Add album')}
                    onPress={() => {
                      navigation.navigate(ALBUM_CREATOR, { id });
                    }}
                  />
                </>
              )
              : null}
            {/* <SongsList songsList={artistInfo.songs} /> */}
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  button: {
    marginBottom: 20,
  },
  sectionTitle: {
    ...headerTitle,
    marginBottom: 5,
    marginTop: 10,
  },
  textTitle: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  textItem: {
    ...secondaryText,
    fontSize: 16,
    marginBottom: 5,
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
});

export default ArtistProfile;
