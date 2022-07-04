import React from 'react';
import { Image } from 'react-native';

const RandomImage = ({ id, style = {} }) => {
  return (
    <Image
      style={{
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        ...style,
      }}
      source={{ uri: `https://picsum.photos/500/500?random=${id}` }}
    />
  );
};

export default RandomImage;
