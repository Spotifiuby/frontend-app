/* eslint-disable react/prop-types */
import {
  StyleSheet, View, Text, TextInput, ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { getDocumentAsync } from 'expo-document-picker';
import { Octicons } from '@expo/vector-icons';
import theme, {
  crossCentered, formContentWidth, oneUnitFlex, secondaryText, textField,
} from '../../theme';
import FormField from '../Inputs/FormField';
import RoundedButton from '../Buttons/RoundedButton';
import Title from '../Text/Title';
import useTranslation from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import useSongsSystem from '../../SpotifiubySystem/SongsSystem/useSongsSystem';
import useNotificationSystem from '../../SpotifiubySystem/NotificationSystem/useNotificationSystem';

const chooseFileSong = async (setSongFile) => {
  const result = await getDocumentAsync({ type: '*/*', copyToCacheDirectory: true })
    .then((response) => {
      if (response.type !== 'success') return;
      setSongFile(response);
    });
  return result;
};

const SongUploader = ({ navigation, route }) => {
  const songsSytem = useSongsSystem();
  const notificationSytem = useNotificationSystem();
  const artistId = route.params.id;
  const { t } = useTranslation();
  const [songFile, setSongFile] = useState({});
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  return (
    <View style={style.container}>
      <Title text="Upload a song" />
      <View style={style.formContainer}>
        <FormField label={t('Song file')}>
          <View style={style.fileInput}>
            <RoundedButton
              style={style.uploadButtonContainer}
              onPress={() => chooseFileSong(setSongFile)}
            >
              <Octicons name="upload" size={20} color={theme.color.foreground} />
              <Text style={style.uploadButtonText}>{t('Choose file')}</Text>
            </RoundedButton>
            <Text style={style.text}>{songFile.name || t('No file selected yet')}</Text>
          </View>
        </FormField>
        <FormField label={t('Title')}>
          <TextInput
            style={style.textField}
            value={title}
            onChangeText={setTitle}
            placeholder={t('Title')}
            accessibilityLabel={t('Title input')}
          />
        </FormField>
        <FormField label={t('Genre')}>
          <TextInput
            style={style.textField}
            value={genre}
            onChangeText={setGenre}
            placeholder={t('Genre')}
            accessibilityLabel={t('Genre input')}
          />
        </FormField>

        <RoundedButton
          style={style.confirmActionButton}
          onPress={
            () => {
              setLoadingStatus(true);
              songsSytem.uploadSong(songFile, { name: title, genre, artists: [artistId] })
                .then(() => {
                  notificationSytem.show(t('Song uploaded successfully'));
                  navigation.goBack();
                })
                .catch(() => {
                  notificationSytem.show(t('An error has occurred while uploading song'));
                })
                .finally(() => setLoadingStatus(false));
            }
          }
          disabled={(!title || !genre || !songFile.name) && !loadingStatus}
        >
          {loadingStatus
            ? <ActivityIndicator />
            : <Text style={style.confirmActionButtonText}>{t('Upload').toUpperCase()}</Text>}
        </RoundedButton>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  confirmActionButton: {
    marginTop: 20,
  },
  confirmActionButtonText: {
    color: theme.color.foreground,
    fontWeight: theme.fontWeight.primary,
  },
  container: {
    ...oneUnitFlex,
    ...crossCentered,
    paddingHorizontal: 15,
  },
  fileInput: {
    ...crossCentered,
    flexDirection: 'row',
  },
  formContainer: {
    ...formContentWidth,
  },
  text: {
    ...secondaryText,
    fontSize: 15,
    // marginBottom: 4,
    marginLeft: 13,
  },
  textField,
  uploadButtonContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 20,
    width: 132,
  },
  uploadButtonText: {
    color: theme.color.foreground,
    marginBottom: 4,
    marginLeft: 8,
  },
});

export default SongUploader;
