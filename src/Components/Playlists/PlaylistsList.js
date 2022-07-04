import { View } from 'react-native';
import propTypes from 'prop-types';
import Playlist from './Playlist';

const PlaylistsList = ({ playlists }) => {

  return (
    <View>
      {playlists.map((playlist) => {
        return (
          <Playlist
            key={playlist.id}
            playlist={playlist}
          />
        );
      })}
    </View>
  );
};

PlaylistsList.propTypes = {
  playlists: propTypes.arrayOf(Object).isRequired,
};

export default PlaylistsList;
