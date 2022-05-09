import { Text, StyleSheet, Pressable } from 'react-native';
import StylePropType from 'react-style-proptype';
import propTypes from 'prop-types';
import {
  bold, crossCentered, disabledOpacity, primary, roundedButtonBorder, textColor,
} from '../../theme';

const CTAButton = ({
  title, style, onPress, disabled, upperCased, ...props
}) => {
  const flattenStyle = StyleSheet.flatten([
    CTAStyles.button,
    style,
    disabled ? CTAStyles.disabled : CTAStyles.enabled,
  ]);
  return (
    <Pressable
      style={flattenStyle}
      onPress={() => !disabled && onPress()}
      {...props}
    >
      <Text style={CTAStyles.title}>{upperCased ? title.toUpperCase() : title}</Text>
    </Pressable>
  );
};

const CTAStyles = StyleSheet.create({
  button: {
    ...roundedButtonBorder,
    ...crossCentered,
    paddingHorizontal: 20,
    paddingVertical: 13,
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
  upperCased: true,
};

CTAButton.propTypes = {
  style: StylePropType,
  disabled: propTypes.bool,
  title: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
  upperCased: propTypes.bool,
};

export default CTAButton;
