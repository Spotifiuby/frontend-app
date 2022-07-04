import { ScrollView } from 'react-native';
import propTypes from 'prop-types';
import {
  useContext,
} from 'react';
import SongInList from './SongInList';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongPlayerContext from './SongPlayerContext';

const SongsList = ({ songsList, showArtist=true }) => {
  const { setSongsList } = useContext(SongPlayerContext);

  return (
    <ScrollView>
      {songsList.songs.map((song) => {
        return (
          <SongInList
            key={song.id}
            song={song}
            isPlaying={false}
            playCallback={() => setSongsList(songsList)}
            showArtist={showArtist}
          />
        );
      })}
    </ScrollView>
  );
};

SongsList.propTypes = {
  songsList: propTypes.instanceOf(SongReproductionList).isRequired,
};

export default SongsList;
