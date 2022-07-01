/* eslint-disable react/prop-types */

import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import useAuthSystem from '../../SpotifiubySystem/AuthSystem/useAuthSystem';
import useSongsSystem from '../../SpotifiubySystem/SongsSystem/useSongsSystem';
import CTAButton from '../Buttons/CTAButton';
// import SongsList from '../Songs/SongsList';
import Title from '../Text/Title';
import { SONG_UPLOADER } from './UploadNavigationOptions';
import { oneUnitFlex } from '../../theme';

const ArtistProfile = ({ navigation, route }) => {
  const { id } = route.params;
  const songsSystem = useSongsSystem();
  const authSystem = useAuthSystem();
  const [artistInfo, setArtistInfo] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator style={{ alignSelf: 'center' }}/>
        : (
          <>
            <Title text={artistInfo.name} />
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
