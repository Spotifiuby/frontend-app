import {
  Text, View, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import { useContext } from 'react';
import propTypes from 'prop-types';
import theme, {
  crossCentered, textColor, secondaryText, mainCentered,
} from '../../theme';
import Song from '../../SpotifiubySystem/SongsSystem/Song';
import CoverPicture from './CoverPicture';
import SongPlayerContext from './SongPlayerContext';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const SongInList = ({ song, isPlaying, playCallback, showArtist=true }) => {
  const { t } = useTranslation();
  const { setCurrentlyPlayingID } = useContext(SongPlayerContext);
  return (
    <Pressable
      style={styles.songInfoContainer}
      onPress={() => {
        setCurrentlyPlayingID(!isPlaying ? song.id : '');
        playCallback();
      }}
    >
      <View style={styles.songImage}>
        <CoverPicture song={song}/>
      </View>
      {isPlaying ? <Text style={styles.songPlayingOverlay}>{t('Playing')}</Text> : null}
      <View style={styles.songInfoTextContainer}>
        <Text
          style={styles.songTitle}
          numberOfLines={1}
          ellipsisMode="clip"
        >
          {song.title}
        </Text>
        {showArtist ? (
          <Text style={styles.songArtist}>{song.artistsDisplayableForm()}</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

SongInList.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  song: propTypes.instanceOf(Song).isRequired,
  playCallback: propTypes.func.isRequired,
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
