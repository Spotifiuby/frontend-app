import { Text, StyleSheet, Pressable } from 'react-native';
import propTypes from 'prop-types';
import {
  bold,
  crossCentered, secondaryText,
} from '../../theme';

const SecondaryButton = ({
  title, onPress, ...props
}) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    ...crossCentered,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    ...secondaryText,
    ...bold,
    fontSize: 15,
    marginTop: 20,
  },
});

SecondaryButton.propTypes = {
  title: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
};

export default SecondaryButton;
