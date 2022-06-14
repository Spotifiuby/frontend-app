import {
  useContext, useEffect, useState,
} from 'react';
import {
  FlatList, View, StyleSheet, TextInput, Text,
} from 'react-native';
import {
  headerTitle,
  oneUnitFlex, secondaryText, textField,
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongInList from '../Songs/SongInList';
import SongPlayerContext from '../Songs/SongPlayerContext';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const SearchScreen = () => {
  const system = useContext(SystemContext);
  const { setCurrentlyPlayingID } = useContext(SongPlayerContext);
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
    if (!query) {
      setQueriedBySong(new SongReproductionList([]));
      setQueriedByArtist([]);
      setQueriedByAlbum([]);
      return;
    }
    songsSystem.songsFilteredBy(query)
      .then((songs) => setQueriedBySong(new SongReproductionList(songs)));
    songsSystem.artistsFilteredBy(query).then(setQueriedByArtist);
    songsSystem.albumsFilteredBy(query).then(setQueriedByAlbum);
    // songsSystem.playlistsFilteredBy(query).then(setQueriedByPlaylist);
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

      <View style={playlistStyle.resultsContainer}>
        {queriedBySong.songs.length > 0
          ? (
            <View style={playlistStyle.resultContainer}>
              <Text style={playlistStyle.sectionTitle}>{t('Songs')}</Text>
              <FlatList
                data={queriedBySong.songs}
                renderItem={({ item }) => {
                  const song = item;
                  return (
                    <SongInList
                      song={song}
                      isPlaying={false}
                      setCurrentlyPlayingID={setCurrentlyPlayingID}
                    />
                  );
                }}
                keyExtractor={(song) => song.id}
              />
            </View>
          )
          : null}

        {queriedByArtist.length > 0
          ? (
            <View style={playlistStyle.resultContainer}>
              <Text style={playlistStyle.sectionTitle}>{t('Artists')}</Text>
              <FlatList
                data={queriedByArtist}
                renderItem={({ item }) => {
                  const { name } = item;
                  return (
                    <Text style={playlistStyle.textItem}>{name}</Text>
                  );
                }}
                keyExtractor={(artist) => artist.id}
              />
            </View>
          )
          : null}

        {queriedByAlbum.length > 0
          ? (
            <View style={playlistStyle.resultContainer}>
              <Text style={playlistStyle.sectionTitle}>{t('Albums')}</Text>
              <FlatList
                data={queriedByAlbum}
                renderItem={({ item }) => {
                  const { name, artists, year } = item;
                  return (
                    <Text style={playlistStyle.textItem}>
                      {`${name} - ${artists[0]} - ${year}`}
                    </Text>
                  );
                }}
                keyExtractor={(song) => song.id}
              />
            </View>
          )
          : null}
      </View>
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
