import {
  StyleSheet, View, Text, TextInput, ActivityIndicator,
} from 'react-native';
import { useContext, useState } from 'react';
import { getDocumentAsync } from 'expo-document-picker';
import { Octicons } from '@expo/vector-icons';
import theme, {
  crossCentered,
  formContentWidth, headerTitle, oneUnitFlex, secondaryText, textField,
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import FormField from '../Inputs/FormField';
import RoundedButton from '../Buttons/RoundedButton';

const chooseFileSong = async (setSongFile) => {
  const result = await getDocumentAsync({ type: '*/*', copyToCacheDirectory: true })
    .then((response) => {
      if (response.type !== 'success') return;
      setSongFile(response);
    });
  return result;
};

const uploadSongUIAction = async (songsSytem, songFile, metadata, setLoadingStatus) => {
  setLoadingStatus(true);
  try {
    await songsSytem.uploadSong(songFile, metadata);
  } catch (e) {
    console.log((e));
  } finally {
    setLoadingStatus(false);
  }
};

const SongUploader = () => {
  const system = useContext(SystemContext);
  const songsSytem = system.systemImplementing(SongsSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  const [songFile, setSongFile] = useState({});
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  return (
    <View style={style.container}>
      <Text style={style.title}>{t('Upload a song')}</Text>
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
        <FormField label={t('Artist')}>
          <TextInput
            style={style.textField}
            value={artist}
            onChangeText={setArtist}
            placeholder={t('Artist')}
            accessibilityLabel={t('Artist input')}
          />
        </FormField>

        <RoundedButton
          style={style.confirmActionButton}
          onPress={
            () => {
              uploadSongUIAction(songsSytem, songFile, { title, artist }, setLoadingStatus);
            }
          }
          disabled={(!title || !artist || !songFile.name) && !loadingStatus}
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
    paddingHorizontal: 15,
    ...crossCentered,
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
  title: headerTitle,
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
