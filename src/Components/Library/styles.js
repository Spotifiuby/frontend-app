import { StyleSheet } from 'react-native';
import { oneUnitFlex } from '../../theme';

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  createPlaylist: {
    alignSelf: 'flex-end',
  },
});

export default styles;
