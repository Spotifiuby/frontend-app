import {
  Text, StyleSheet,
} from 'react-native';
import propTypes from 'prop-types';
import { headerTitle } from '../../theme';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';

const Title = ({ text }) => {
  const { t } = useTranslation();
  return (
    <Text style={styles.title}>
      {t(text)}
    </Text>
  );
};

Title.propTypes = {
  text: propTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: headerTitle,
});

export default Title;
