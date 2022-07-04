import { TextInput, View } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Title from '../Text/Title';
import FormField, { clearErrorsWith } from '../Inputs/FormField';
import useTranslation
  from '../../SpotifiubySystem/TranslationSystem/useTranslation';
import ErrorCard from '../Inputs/ErrorCard';
import CTAButton from '../Buttons/CTAButton';
import { textField } from '../../theme';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';

const CreatePlaylistScreen = () => {
  const system = useContext(SystemContext);
  const { t } = useTranslation();
  const [playlistName, setPlaylistName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorAfter = (setField) => clearErrorsWith(errorMessage, setErrorMessage, setField);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const navigation = useNavigation();
  const createPlaylistAction = (newPlaylistName) => {
    songsSystem.createPlaylist({ name: newPlaylistName })
      .then((result) => {
        console.log(result);
        navigation.navigate(t('Library'));
      });
  };
  return (
    <View>
      <Title text="Create playlist" />
      <FormField label={t('Playlist name')}>
        <TextInput
          style={textField}
          value={playlistName}
          onChangeText={clearErrorAfter(setPlaylistName)}
          placeholder={t('Playlist name')}
          accessibilityLabel={t('Playlist name input')}
        />
      </FormField>
      <CTAButton
        onPress={() => {
          createPlaylistAction(playlistName);
        }}
        title={t('Create')}
        accessibilityLabel={t('Create button')}
        disabled={!playlistName}
      />
      <ErrorCard errorMessage={t(errorMessage)} />
    </View>
  );
};

export default CreatePlaylistScreen;
