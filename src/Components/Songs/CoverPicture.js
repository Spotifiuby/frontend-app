import RandomImage from '../images/RandomImage';
import { View } from 'react-native';
import { crossCentered, mainCentered, oneUnitFlex, textColor } from '../../theme';

// eslint-disable-next-line react/prop-types
const CoverPicture = ({ song, album, user, style }) => {
  return (
    <View style={{
      ...oneUnitFlex,
      ...textColor,
      ...crossCentered,
      ...mainCentered,
      aspectRatio: 1,
    }}>
      <RandomImage id={(song?.id) ?? (album?.id) ?? (user?.id) ?? 1} style={style}/>
    </View>
  );
};

export default CoverPicture;
