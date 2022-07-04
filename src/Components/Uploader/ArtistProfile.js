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
// import SongsList from '../Songs/SongsList';
import Title from '../Text/Title';
import { SONG_UPLOADER, ALBUM_CREATOR } from './UploadNavigationOptions';
import { headerTitle, oneUnitFlex, secondaryText } from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongsList from '../Songs/SongsList';

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
            <Title text={artistInfo.name} />
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
                          <Pressable key={id} onPress={() => {
                            //navigation.navigate(ARTIST_PROFILE, { id });
                            console.log('Implement me!');
                          }}>
                            <Text style={styles.textItem}>{name}</Text>
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
                    <SongsList songsList={songsList}/>
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
  textItem: {
    ...secondaryText,
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ArtistProfile;
