import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';
import {
  leftAligned, textColor,
} from '../theme';

const FormField = ({ label, children }) => {
  return (
    <View styles={{ ...leftAligned }}>
      <Text style={fieldStyles.label}>{label}</Text>
      {children}
    </View>
  );
};

FormField.defaultProps = {
  label: '',
};

FormField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const fieldStyles = StyleSheet.create({
  label: textColor,
});

export default FormField;
