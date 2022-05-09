import propTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { errorContainer, paddedContainer, tenMarginTop } from '../../theme';

const ErrorCard = ({ errorMessage }) => {
  return (
    errorMessage
      ? <Text style={errorStyles.card}>{errorMessage}</Text> : null
  );
};

const errorStyles = StyleSheet.create({
  card: {
    ...errorContainer,
    ...paddedContainer,
    ...tenMarginTop,
    borderRadius: 3,
  },
});

ErrorCard.propTypes = {
  errorMessage: propTypes.string.isRequired,
};

export default ErrorCard;
