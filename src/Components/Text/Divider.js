import { StyleSheet, View } from 'react-native';
import theme, { fullWidth } from '../../theme';

const Divider = () => {
  return (
    <View
      style={styles.divider}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    ...fullWidth,
    borderBottomColor: theme.color.secondaryText,
    borderBottomWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default Divider;
