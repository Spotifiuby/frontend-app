import { ScrollView } from 'react-native-web';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
} from 'react-native';
import { Card } from 'react-native-paper';
import {useCallback, useContext, useState} from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface
  from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList
  from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import useTranslation
  from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import Title from "../Text/Title";

const PlaylistSelectionScreen = () => {
  const system = useContext(SystemContext);
  const { t } = useTranslation();
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState({});
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const navigation = useNavigation();
  const createPlaylistAction = (newPlaylistName) => {
    songsSystem.createPlaylist({ name: newPlaylistName, songs: Object.keys(selectedSongs) })
      .then((result) => {
        console.log(result);
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
    const newSelectedSongs = { ...selectedSongs, [id]: selectedSongs[id] ? undefined : true };
    setSongs(temp);
    setSelectedSongs(newSelectedSongs);
  };
  return (
    <ScrollView>
      <Title text="Select songs" />
      <FlatList
        data={songs}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChange(item.id);
                  }}
                />
                <Text>{item.txt}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'space-between',
    margin: 20,
    padding: 5,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PlaylistSelectionScreen;
