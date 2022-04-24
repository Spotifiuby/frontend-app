import { Text, StyleSheet, Pressable } from 'react-native';
import StylePropType from 'react-style-proptype';
import PropTypes from 'prop-types';
import {
  bold, crossCentered, disabledOpacity, primary, roundedButtonBorder, textColor,
} from '../theme';

const CTAButton = ({
  title, style, onPress, disabled, ...props
}) => {
  const flattenStyle = StyleSheet.flatten([
    style,
    CTAStyles.button,
    disabled ? CTAStyles.disabled : CTAStyles.enabled,
  ]);
  return (
    <Pressable
      style={flattenStyle}
      onPress={() => !disabled && onPress()}
      {...props}
    >
      <Text style={CTAStyles.title}>{title.toUpperCase()}</Text>
    </Pressable>
  );
};

const CTAStyles = StyleSheet.create({
  button: {
    ...roundedButtonBorder,
    ...crossCentered,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  disabled: { ...primary, ...disabledOpacity },
  enabled: primary,
  title: {
    ...bold,
    ...textColor,
  },
});

CTAButton.defaultProps = {
  disabled: false,
  style: undefined,
};

CTAButton.propTypes = {
  style: StylePropType,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CTAButton;
