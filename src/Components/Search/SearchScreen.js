import { useContext, useEffect, useState, } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, } from 'react-native';
import { headerTitle, oneUnitFlex, secondaryText, textField, } from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import SongsList from '../Songs/SongsList';

const SearchScreen = () => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [queriedBySong, setQueriedBySong] = useState(new SongReproductionList([]));
  const [queriedByArtist, setQueriedByArtist] = useState([]);
  const [queriedByAlbum, setQueriedByAlbum] = useState([]);
  // const [queriedByPlaylist, setQueriedByPlaylist] = useState([]);
  useEffect(() => {
    songsSystem.initialize();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!query) {
        setQueriedBySong(new SongReproductionList([]));
        setQueriedByArtist([]);
        setQueriedByAlbum([]);
        return;
      }
      songsSystem.songsFilteredBy(query)
        .then((songs) => setQueriedBySong(new SongReproductionList(songs)));
      songsSystem.artistsFilteredBy(query)
        .then(setQueriedByArtist);
      songsSystem.albumsFilteredBy(query)
        .then(setQueriedByAlbum);
      console.log('Query - Songs', query, queriedBySong.songs);
      // songsSystem.playlistsFilteredBy(query).then(setQueriedByPlaylist);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

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
                  return (
                    <Text style={playlistStyle.textItem}>{name} </Text>
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
  },
});

export default SearchScreen;
