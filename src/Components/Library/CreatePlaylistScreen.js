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

const CreatePlaylistScreen = () => {
  const { t } = useTranslation();
  const [playlistName, setPlaylistName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorAfter = (setField) => clearErrorsWith(errorMessage, setErrorMessage, setField);
  const navigation = useNavigation();
  const confirmPlayListName = () => {
    if (playlistName.length > 0) {
      navigation.navigate(t('Playlist Songs Selection'), { playlistName });
    }
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
          confirmPlayListName(playlistName);
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
