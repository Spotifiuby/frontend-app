import {
  Text, View, StyleSheet,
} from 'react-native';
import { useContext } from 'react';
import { headerTitle, oneUnitFlex } from '../../theme';
import LanguageChooser from './LanguageChooser';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import SecondaryButton from '../Buttons/SecondaryButton';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';

const SettingsScreen = () => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('Settings')}
      </Text>
      <LanguageChooser />
      <SecondaryButton title={t('Log out')} onPress={() => authSystem.logOut()} />
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
