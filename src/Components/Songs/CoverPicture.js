import { FontAwesome } from '@expo/vector-icons';
import theme from '../../theme';

// eslint-disable-next-line react/prop-types
const CoverPicture = () => {
  return (
    <FontAwesome name="music" size={30} color={theme.color.secondaryText} />
  );
};

export default CoverPicture;
