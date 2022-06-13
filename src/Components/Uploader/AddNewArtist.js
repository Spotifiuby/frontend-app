/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  StyleSheet, TextInput, View, ActivityIndicator,
} from 'react-native';
import useNotificationSystem from '../../SpotifiubySystem/NotificationSystem/useNotificationSystem';
import useSongsSystem from '../../SpotifiubySystem/SongsSystem/useSongsSystem';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import { textField } from '../../theme';
import CTAButton from '../Buttons/CTAButton';
import FormField from '../Inputs/FormField';
import Title from '../Text/Title';
import { UPLOAD_DASHBOARD } from './UploadNavigationOptions';

const AddNewArtist = ({ navigation }) => {
  const [artist, setArtist] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const songsSystem = useSongsSystem();
  const notificationSystem = useNotificationSystem();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Title text="New artist" />
      <FormField label={t('Artist name')}>
        <TextInput
          style={styles.textField}
          value={artist}
          onChangeText={setArtist}
          placeholder={t('Artist name')}
          accessibilityLabel={t('Artist name input')}
        />
      </FormField>
      {isLoading ? <ActivityIndicator /> : null}
      <CTAButton
        title={t('Create new')}
        disabled={!artist || isLoading}
        onPress={() => {
          setIsLoading(true);
          songsSystem.createNewArtist(artist)
            .then(() => {
              notificationSystem.show(t('Artist created successfully'));
              navigation.navigate(UPLOAD_DASHBOARD);
            })
            .catch(() => notificationSystem.show(t('An error has occurred with the connection.')))
            .finally(() => setIsLoading(false));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textField: {
    ...textField,
    marginBottom: 50,
  },
});

export default AddNewArtist;
