import propTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';
import {
  leftAligned, textColor,
} from '../../theme';

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
  children: null,
};

FormField.propTypes = {
  label: propTypes.string,
  children: propTypes.node,
};

const fieldStyles = StyleSheet.create({
  label: textColor,
});

export const clearErrorsWith = (errors, setErrors, changeField) => ((value) => {
  if (errors) setErrors('');
  changeField(value);
});

export default FormField;
