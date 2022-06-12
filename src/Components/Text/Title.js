import { useContext } from 'react';
import {
  Text, StyleSheet,
} from 'react-native';
import propTypes from 'prop-types';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import { headerTitle } from '../../theme';

const Title = ({ text }) => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
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
