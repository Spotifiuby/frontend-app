import { FlatList } from 'react-native';
import propTypes from 'prop-types';
import {
  useContext,
} from 'react';
import SongInList from './SongInList';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongPlayerContext from './SongPlayerContext';

const SongsList = ({ songsList }) => {
  const { setSongsList } = useContext(SongPlayerContext);
  if (songsList.songs.length === 0) return null;
  return (
    <FlatList
      data={songsList.songs}
      renderItem={({ item }) => {
        const song = item;
        return (
          <SongInList
            song={song}
            isPlaying={false}
            setSongsList={setSongsList}
            playCallback={() => setSongsList(songsList)}
          />
        );
      }}
      keyExtractor={(song) => song.id}
    />
  );
};

SongsList.propTypes = {
  songsList: propTypes.instanceOf(SongReproductionList).isRequired,
};

export default SongsList;
