import {
  Text, View, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import propTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
  crossCentered, textColor, secondaryText, mainCentered,
} from '../../theme';
import CoverPicture from '../Songs/CoverPicture';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const Playlist = ({ playlist }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.songInfoContainer}
      onPress={() => {
        navigation.navigate(t('Playlist'), { playlistId: playlist.id });
      }}
    >
      <CoverPicture song={playlist} style={styles.songImage} />
      <View style={styles.songInfoTextContainer}>
        <Text
          style={styles.songTitle}
          numberOfLines={1}
          ellipsisMode="clip"
        >
          {playlist.title}
        </Text>
        <Text style={styles.songArtist}>{playlist.name}</Text>
      </View>
    </Pressable>
  );
};

Playlist.propTypes = {
  playlist: propTypes.instanceOf(Object).isRequired,
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
  songTitle: {
    ...textColor,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
  },
});

export default Playlist;
