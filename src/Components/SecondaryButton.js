import { Text, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import {
  crossCentered, secondaryText,
} from '../theme';

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
    fontSize: 15,
    marginTop: 15,
  },
});

SecondaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SecondaryButton;
