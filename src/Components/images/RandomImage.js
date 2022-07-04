import React from 'react';

const RandomImage = ({ id, style={} }) => {
  return (
    <img style={{
      width: '100%',
      height: '100%',
      aspectRatio: 1,
      ...style,
    }} src={`https://picsum.photos/500/500?random=${id}`} alt="random image"/>
  );
};

export default RandomImage;
