import { StyleSheet, Pressable } from 'react-native';
import StylePropType from 'react-style-proptype';
import propTypes from 'prop-types';
import {
  crossCentered, disabledOpacity, primary, roundedButtonBorder,
} from '../../theme';

const RoundedButton = ({
  // eslint-disable-next-line react/prop-types
  children, style, onPress, disabled, upperCased, ...props
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
      {children}
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
});

RoundedButton.defaultProps = {
  disabled: false,
  style: undefined,
  upperCased: true,
};

RoundedButton.propTypes = {
  style: StylePropType,
  disabled: propTypes.bool,
  onPress: propTypes.func.isRequired,
  upperCased: propTypes.bool,
};

export default RoundedButton;
