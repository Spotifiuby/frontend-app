import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import theme, {
  headerTitle, mainCentered, oneUnitFlex, secondaryText,
} from '../../theme';

const ConnectionErrorScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={60} color={theme.color.errorBackground} />
      <Text style={styles.main}>
        {t('Error while trying to connect to server.')}
      </Text>
      <Text style={styles.tag}>
        {t('Please retry.')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    ...mainCentered,
    padding: 30,
  },
  main: {
    ...headerTitle,
  },
  tag: {
    ...secondaryText,
    fontSize: 19,
  },
});

export default ConnectionErrorScreen;
