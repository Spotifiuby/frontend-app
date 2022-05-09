import {
  Text, View, Image, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import propTypes from 'prop-types';
import { buildEndpointFor } from '../../fetch-helpers';
import theme, {
  crossCentered, textColor, secondaryText, oneUnitFlex,
} from '../../theme';

const SongInList = ({ song, isPlaying, setCurrentlyPlayingID }) => {
  const { t } = useTranslation();
  const { id, name, artists } = song;
  return (
    <Pressable
      style={styles.songInfoContainer}
      onPress={() => setCurrentlyPlayingID(!isPlaying ? id : '')}
    >
      <View>
        <Image
          source={{
            uri: buildEndpointFor('songs', id, 'cover'),
          }}
          style={styles.songImage}
          accessibilityLabel={t('Spotifiuby logo image')}
        />
        {isPlaying ? <Text style={styles.songPlayingOverlay}>{t('Playing')}</Text> : null}
      </View>
      <View style={styles.songInfoTextContainer}>
        <Text
          style={styles.songTitle}
          numberOfLines={1}
          ellipsisMode="clip"
        >
          {name}
        </Text>
        <Text style={styles.songArtist}>{artists.join(', ')}</Text>
      </View>
    </Pressable>
  );
};

SongInList.propTypes = {
  setCurrentlyPlayingID: propTypes.func.isRequired,
  isPlaying: propTypes.bool.isRequired,
  song: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    artists: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  songArtist: secondaryText,
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
    // textAlignVertical: 'middle',
    width: 60,
  },
  songTitle: {
    ...textColor,
    ...oneUnitFlex,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
  },
});

export default SongInList;
