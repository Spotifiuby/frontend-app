import {
  Text, View, StyleSheet,
} from 'react-native';
import { Trans } from 'react-i18next';
import { headerTitle, oneUnitFlex } from '../../theme';
import LanguageChooser from './LanguageChooser';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Settings</Trans>
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
