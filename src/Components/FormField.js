import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';
import {
  leftAligned, textColor,
} from '../theme';

const FormField = ({ label, ...props }) => {
  return (
    <View styles={{ ...leftAligned }}>
      <Text style={fieldStyles.label}>{label}</Text>
      {props.children}
    </View>
  );
};

FormField.defaultProps = {
  label: '',
};

FormField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.elementType.isRequired,
};

const fieldStyles = StyleSheet.create({
  label: textColor,
});

export default FormField;
