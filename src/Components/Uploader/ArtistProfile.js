/* eslint-disable react/prop-types */

import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import useAuthSystem from '../../SpotifiubySystem/AuthSystem/useAuthSystem';
import useSongsSystem from '../../SpotifiubySystem/SongsSystem/useSongsSystem';
import CTAButton from '../Buttons/CTAButton';
// import SongsList from '../Songs/SongsList';
import Title from '../Text/Title';
import { SONG_UPLOADER } from './UploadNavigationOptions';
import { oneUnitFlex } from '../../theme';
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
      songsSystem.getSongsByArtist(id)
        .then((songs) => setSongsList(new SongReproductionList(songs)));
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
              {(songsList.songs.length !== 0)
                ? <SongsList songsList={songsList}/>
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
                      //navigation.navigate(SONG_UPLOADER, { id });
                      console.log("Implement me!");
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
});

export default ArtistProfile;
