/* eslint-disable react/prop-types */
import {
  Text, View, StyleSheet, Dimensions, Pressable,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import theme, {
  oneUnitFlex, secondaryText, textColor, crossCentered, dimContainer,
} from '../../theme';
import CoverPicture from './CoverPicture';
import SongPlayerContext from './SongPlayerContext';

const InlineSongPlayer = ({ songsList, currentlyPlayingID }) => {
  if (!songsList.isOnGoing()) return null;
  const { setCurrentlyPlayingID } = useContext(SongPlayerContext);
  const song = songsList.songIdentifiedBy(currentlyPlayingID);
  return (
    <View style={styles.playerContainer}>
      <CoverPicture song={song} style={styles.songImage} />
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

      <View style={styles.controlsContainer}>
        <Pressable
          onPress={() => {
            setCurrentlyPlayingID(songsList.previousOf(currentlyPlayingID));
          }}
        >
          <MaterialCommunityIcons name="skip-previous-circle-outline" size={35} color={theme.color.secondaryText} />
        </Pressable>
        <Pressable onPress={() => setCurrentlyPlayingID('')}>
          <Feather name="pause-circle" size={40} color={theme.color.secondaryText} />
        </Pressable>
        <Pressable onPress={() => setCurrentlyPlayingID(songsList.nextOf(currentlyPlayingID))}>
          <MaterialCommunityIcons name="skip-next-circle-outline" size={35} color={theme.color.secondaryText} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  controlsContainer: {
    ...crossCentered,
    flexDirection: 'row',
    marginBottom: 5,
  },
  playerContainer: {
    ...dimContainer,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  songArtist: secondaryText,
  songImage: {
    borderRadius: 3,
    height: 40,
    width: 40,
  },
  songInfoTextContainer: {
    ...textColor,
    marginLeft: 15,
  },
  songTitle: {
    ...textColor,
    ...oneUnitFlex,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 185,
  },
});

export default InlineSongPlayer;
