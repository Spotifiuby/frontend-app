/* eslint-disable react/prop-types */
import {
  StyleSheet, View, Text, TextInput, ActivityIndicator, Picker,
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  return await getDocumentAsync({
    type: '*/*',
    copyToCacheDirectory: true
  })
    .then((response) => {
      if (response.type !== 'success') return;
      console.log('GET-DOC', response);
      setSongFile(response);
    });
};

const SongUploader = ({ navigation, route }) => {
  const songsSystem = useSongsSystem();
  const notificationSystem = useNotificationSystem();
  const artistId = route.params.id;
  const { t } = useTranslation();
  const [songFile, setSongFile] = useState({});
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [album, setAlbum] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [albumList, setAlbumList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      songsSystem.getAlbumsByArtist(artistId).then((fetchedAlbums) => {
        console.log(fetchedAlbums);
        setAlbumList(fetchedAlbums);
      });
    }, [artistId]),
  );

  const renderAlbumList = () => {
    return albumList.map((album) => {
      return <Picker.Item label={album.name} value={album.id} key={album.id}/>;
    }
    );
  }

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
              <Octicons name="cloud-upload" size={20} color={theme.color.foreground} />
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
        <FormField label={t('Album')}>
          <Picker
            style={style.textField}
            selectedValue={album}
            onValueChange={setAlbum}
          >
            <Picker.Item label="-" value="-" />
            {renderAlbumList(artistId)}
          </Picker>
        </FormField>
        <RoundedButton
          style={style.confirmActionButton}
          onPress={
            () => {
              setLoadingStatus(true);
              songsSystem.uploadSong(songFile, { name: title, genre, artists: [artistId] }, album)
                .then(() => {
                  notificationSystem.show(t('Song uploaded successfully'));
                  navigation.goBack();
                })
                .catch((e) => {
                  console.log(e)
                  notificationSystem.show(t('An error has occurred while uploading song'));
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
