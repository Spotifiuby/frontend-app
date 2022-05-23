import {
  Text, View, StyleSheet,
} from 'react-native';
import { useContext } from 'react';
import { headerTitle, oneUnitFlex } from '../../theme';
import LanguageChooser from './LanguageChooser';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';

const SettingsScreen = () => {
  const system = useContext(SystemContext);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('Settings')}
      </Text>
      <LanguageChooser />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  title: headerTitle,
});

export default SettingsScreen;
