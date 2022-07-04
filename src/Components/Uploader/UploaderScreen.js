/* eslint-disable react/prop-types */
import { AntDesign} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  ScrollView, View, Text, StyleSheet, Pressable, ActivityIndicator,
} from 'react-native';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import theme, {
  crossCentered, fullWidth, mainCentered, oneUnitFlex, textColor,
} from '../../theme';
import Title from '../Text/Title';
import AddNewArtist from './AddNewArtist';
import ArtistProfile from './ArtistProfile';
import SongUploader from './SongUploader';
import AlbumCreator from './AlbumCreator';
import {
  ADD_NEW_ARTIST, ARTIST_PROFILE, SONG_UPLOADER, UPLOAD_DASHBOARD, ALBUM_CREATOR, ALBUM_PROFILE,
} from './UploadNavigationOptions';
import RandomImage from '../images/RandomImage';
import AlbumProfile from '../Albums/AlbumProfile';

const UploaderScreen = ({ navigation }) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const [currentUser, setCurrentUser] = useState('');
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authSystem.getAuthInfo().then(({ email }) => setCurrentUser(email));
  }, []);
  useFocusEffect(
    useCallback(() => {
      songsSystem.getArtistsOwnedBy(currentUser).then((fetchedArtists) => {
        setArtists(fetchedArtists);
        setIsLoading(false);
      });
    }, [currentUser, isLoading]),
  );
  return (
    <View style={styles.container}>
      <Title text="My Artists" />
      {isLoading
        ? <ActivityIndicator />
        : (
          <ScrollView>
            <View style={styles.itemContainer}>
              {artists.map(({ id, name }) => {
                return (
                  <Pressable
                    key={id}
                    style={styles.cardContainer}
                    onPress={() => {
                      navigation.navigate(ARTIST_PROFILE, { id });
                    }}
                  >
                    <View style={styles.cardItem}>
                      <RandomImage id={id}/>
                    </View>
                    <Text style={styles.cardTitle}>{name}</Text>
                  </Pressable>
                );
              })}
              <Pressable
                style={styles.cardContainer}
                onPress={() => navigation.navigate(ADD_NEW_ARTIST, {})}
              >
                <View style={styles.cardItem}>
                  <AntDesign name="pluscircleo" size={50} color={theme.color.overlayTextColor} />
                </View>
              </Pressable>
            </View>
          </ScrollView>
        )}

    </View>
  );
};

const Stack = createNativeStackNavigator();
export const UploaderNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={UPLOAD_DASHBOARD}>
      <Stack.Screen name={UPLOAD_DASHBOARD} component={UploaderScreen} />
      <Stack.Screen name={ADD_NEW_ARTIST} component={AddNewArtist} />
      <Stack.Screen name={ARTIST_PROFILE} component={ArtistProfile} />
      <Stack.Screen name={SONG_UPLOADER} component={SongUploader} />
      <Stack.Screen name={ALBUM_CREATOR} component={AlbumCreator} />
      <Stack.Screen name={ALBUM_PROFILE} component={AlbumProfile} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    margin: 5,
    width: '30%',
  },
  cardItem: {
    // ...oneUnitFlex,
    ...textColor,
    ...crossCentered,
    ...mainCentered,
    alignItems: 'center',
    backgroundColor: theme.color.secondarybackground,
    borderRadius: 5,
    flexDirection: 'row',
    height: 80,
    width: 80,
    marginBottom: 5,
  },
  cardTitle: {
    ...textColor,
    alignSelf: 'center',
  },
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  itemContainer: {
    ...oneUnitFlex,
    ...fullWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    'justify-content': 'space-around',
    paddingHorizontal: 5,
  },
});

export default UploaderScreen;
