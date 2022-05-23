import { Image } from 'react-native';
import { useContext } from 'react';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import TranslationSystemInterface from '../../SpotifiubySystem/TranslationSystem/TranslationSystemInterface';

// eslint-disable-next-line react/prop-types
const CoverPicture = ({ song, style }) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const { t } = system.systemImplementing(TranslationSystemInterface).stringTranslator();
  return (
    <Image
      source={{
        uri: songsSystem.coverPictureFor(song),
      }}
      style={style}
      accessibilityLabel={t('Album picture')}
    />
  );
};

export default CoverPicture;
