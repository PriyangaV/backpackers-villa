import React from 'react';

const ImgComp = ({ src }) => {
  let imageStyles = {
    width: 100 + '%',
    height: 100 + '%'
  };

  return <img src={src} alt="slider" style={imageStyles} />;
};

export default ImgComp;
