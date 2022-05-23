import {
  Text, View, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import { useContext } from 'react';
import propTypes from 'prop-types';
import theme, {
  crossCentered, textColor, secondaryText, mainCentered,
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import Song from '../../SpotifiubySystem/SongsSystem/Song';
import CoverPicture from './CoverPicture';

const SongInList = ({ song, isPlaying, setCurrentlyPlayingID }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  return (
    <Pressable
      style={styles.songInfoContainer}
      onPress={() => setCurrentlyPlayingID(!isPlaying ? song.id : '')}
    >
      <CoverPicture song={song} style={styles.songImage} />
      {isPlaying ? <Text style={styles.songPlayingOverlay}>{t('Playing')}</Text> : null}
      <View style={styles.songInfoTextContainer}>
        <Text
          style={styles.songTitle}
          numberOfLines={1}
          ellipsisMode="clip"
        >
          {song.title}
        </Text>
        <Text style={styles.songArtist}>{song.artistsDisplayableForm()}</Text>
      </View>
    </Pressable>
  );
};

SongInList.propTypes = {
  setCurrentlyPlayingID: propTypes.func.isRequired,
  isPlaying: propTypes.bool.isRequired,
  song: propTypes.instanceOf(Song).isRequired,
};

const styles = StyleSheet.create({
  songArtist: {
    ...secondaryText,
  },
  songImage: {
    height: 60,
    width: 60,
  },
  songInfoContainer: {
    ...crossCentered,
    flexDirection: 'row',
    marginVertical: 11,
  },
  songInfoTextContainer: {
    ...textColor,
    ...mainCentered,
    marginLeft: 15,
  },
  songPlayingOverlay: {
    alignItems: 'center',
    backgroundColor: theme.color.overlay,
    color: theme.color.overlayTextColor,
    fontSize: 11,
    height: 60,
    lineHeight: 60,
    position: 'absolute',
    textAlign: 'center',
    width: 60,
  },
  songTitle: {
    ...textColor,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
  },
});

export default SongInList;
