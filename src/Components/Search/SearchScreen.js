import { useContext, useEffect, useState, } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import theme, { headerTitle, oneUnitFlex, secondaryText, textField, } from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import SongsList from '../Songs/SongsList';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import { ARTIST_PROFILE, USER_PROFILE } from './SearchNavigationOptions';

const SearchScreen = ({navigation, route}) => {
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
      <View style={playlistStyle.container}>
        <TextInput
          style={playlistStyle.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={t('Search')}
          accessibilityLabel={t('Search input')}
        />
      </View>


      {(queriedBySong.songs.length > 0)
        ? (
          <>
            <View style={playlistStyle.resultsContainer}>
              <Text style={playlistStyle.sectionTitle}>{t('Songs')}</Text>
              <SongsList songsList={queriedBySong}/>
            </View>
          </>
        )
        : null}


      {(queriedByArtist.length > 0)
        ? (
          <>
            <View style={playlistStyle.resultsContainer}>
              <Text style={playlistStyle.sectionTitle}>{t('Artists')}</Text>
              <FlatList
                data={queriedByArtist}
                renderItem={({ item }) => {
                  const { name } = item;
                  const { id } = item;
                  return (
                    <Pressable key={id} onPress={() => {
                      navigation.navigate(ARTIST_PROFILE, { id });
                    }}>
                      <Text style={playlistStyle.textItem}>{name} </Text>
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
            <View style={playlistStyle.resultsContainer}>
              <Text style={playlistStyle.sectionTitle}>{t('Albums')}</Text>
              <FlatList
                data={queriedByAlbum}
                renderItem={({ item }) => {
                  const { name } = item;
                  return (
                    <Text style={playlistStyle.textItem}>{name}</Text>
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
            <View style={playlistStyle.resultsContainer}>
              <Text style={playlistStyle.sectionTitle}>{t('Users')}</Text>
              {queriedUsers.map((user) => {
                return (
                  <Pressable key={user.id} onPress={() => {
                    let userInfo = user
                    let subscriptionInfo = null
                    navigation.navigate(USER_PROFILE, { userInfo, subscriptionInfo })
                  }}>
                    <Text style={playlistStyle.textItem}>{user.email}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : null}
    </>
  );
};

const playlistStyle = StyleSheet.create({
  container: {
    // ...oneUnitFlex,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  resultContainer: {
    flex: 0,
  },
  resultsContainer: {
    ...oneUnitFlex,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  searchInput: {
    ...textField,
    marginBottom: 0,
  },
  sectionTitle: {
    ...headerTitle,
    marginBottom: 5,
    marginTop: 5,
  },
  textItem: {
    ...secondaryText,
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SearchScreen;
