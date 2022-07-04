import { useContext, useEffect, useState, } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  crossCentered,
  headerTitle,
  mainCentered,
  secondaryText,
  textColor,
  textField,
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import SongsList from '../Songs/SongsList';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import { ARTIST_PROFILE, USER_PROFILE } from './SearchNavigationOptions';
import CoverPicture from '../Songs/CoverPicture';
import { ALBUM_PROFILE } from '../Uploader/UploadNavigationOptions';

const SearchScreen = ({navigation, _}) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const authSystem = system.systemImplementing(AuthSystemInterface);

  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [authInfo, setAuthInfo] = useState({});
  const [queriedBySong, setQueriedBySong] = useState(new SongReproductionList([]));
  const [queriedByArtist, setQueriedByArtist] = useState([]);
  const [queriedByAlbum, setQueriedByAlbum] = useState([]);
  const [queriedUsers, setQueriedUsers] = useState([]);

  useEffect(() => {
    songsSystem.initialize();
  }, []);

  useEffect(() => {
    authSystem.getAuthInfo()
      .then(setAuthInfo);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!query) {
        setQueriedBySong(new SongReproductionList([]));
        setQueriedByArtist([]);
        setQueriedByAlbum([]);
        setQueriedUsers([])
        return;
      }

      userSystem.getUsers(query).then(filterUsers)
      songsSystem.songsFilteredBy(query)
        .then((songs) => setQueriedBySong(new SongReproductionList(songs)));
      songsSystem.artistsFilteredBy(query)
        .then(setQueriedByArtist);
      songsSystem.albumsFilteredBy(query)
        .then(setQueriedByAlbum);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  function filterUsers(users) {
    let unique = [...new Map(users
      .filter((user) => (user.email !== authInfo.email))
      .map(item => [item['email'], item]))
      .values()];

    setQueriedUsers(unique);
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={t('Search')}
          accessibilityLabel={t('Search input')}
        />
      </View>

      <ScrollView>
        {(queriedBySong.songs.length > 0)
          ? (
            <>
              <View style={styles.resultsContainer}>
                <Text style={styles.sectionTitle}>{t('Songs')}</Text>
                <SongsList songsList={queriedBySong}/>
              </View>
            </>
          )
          : null}

        {(queriedByArtist.length > 0)
          ? (
            <>
              <View style={styles.resultsContainer}>
                <Text style={styles.sectionTitle}>{t('Artists')}</Text>
                <FlatList
                  data={queriedByArtist}
                  renderItem={({ item }) => {
                    const { name } = item;
                    const { id } = item;
                    return (
                      <Pressable key={id} onPress={() => {
                        navigation.navigate(ARTIST_PROFILE, { id });
                      }}>
                        <Text style={styles.textItem}>{name} </Text>
                      </Pressable>
                    );
                  }}
                  keyExtractor={(artist) => artist.id}
                />
              </View>
            </>
          )
          : null}

        {(queriedByAlbum.length > 0)
          ? (
            <>
              <View style={styles.resultsContainer}>
                <Text style={styles.sectionTitle}>{t('Albums')}</Text>
                <FlatList
                  data={queriedByAlbum}
                  renderItem={({ item }) => {
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
              </View>
            </>
          )
          : null}


        {
          (queriedUsers.length > 0) ? (
            <>
              <View style={styles.resultsContainer}>
                <Text style={styles.sectionTitle}>{t('Users')}</Text>
                {queriedUsers.map((user) => {
                  return (
                    <Pressable key={user.id} onPress={() => {
                      let userInfo = user;
                      let subscriptionInfo = null;
                      navigation.navigate(USER_PROFILE, {
                        userInfo,
                        subscriptionInfo
                      });
                    }}>
                      <Text style={styles.textItem}>{user.email}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...oneUnitFlex,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  resultContainer: {
    flex: 0,
  },
  resultsContainer: {
    //...oneUnitFlex,
    justifyContent: 'flex',
    paddingHorizontal: 20,
  },
  searchInput: {
    ...textField,
    marginBottom: 0,
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

export default SearchScreen;
