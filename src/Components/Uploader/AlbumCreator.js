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
  
  const AlbumCreator = ({ navigation, route }) => {
    const songsSystem = useSongsSystem();
    const notificationSystem = useNotificationSystem();
    const artistId = route.params.id;
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);
    return (
      <View style={style.container}>
        <Title text="Create an Album" />
        <View style={style.formContainer}>
          <FormField label={t('Title')}>
            <TextInput
              style={style.textField}
              value={title}
              onChangeText={setTitle}
              placeholder={t('Title')}
              accessibilityLabel={t('Title input')}
            />
          </FormField>
          <FormField label={t('Year')}>
            <TextInput
              style={style.textField}
              keyboardType="number-pad"
              value={year}
              onChangeText={setYear}
              placeholder={t('2022')}
              accessibilityLabel={t('Year input')}
            />
          </FormField>
  
          <RoundedButton
            style={style.confirmActionButton}
            onPress={
              () => {
                setLoadingStatus(true);
                songsSystem.createAlbum({ name: title, artists: [artistId], songs: [], year: year})
                  .then(() => {
                    notificationSystem.show(t('Album created successfully'));
                    navigation.goBack();
                  })
                  .catch((e) => {
                    console.log(e)
                    notificationSystem.show(t('An error has occurred while creating album'));
                  })
                  .finally(() => setLoadingStatus(false));
              }
            }
            disabled={(!title || !year) && !loadingStatus}
          >
            {loadingStatus
              ? <ActivityIndicator />
              : <Text style={style.confirmActionButtonText}>{t('Create').toUpperCase()}</Text>}
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
  
  export default AlbumCreator;
  