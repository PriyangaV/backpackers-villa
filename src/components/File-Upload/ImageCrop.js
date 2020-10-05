import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ImageCrop extends Component {
  state = {
    crop: {
      unit: 'px',
      x: 100,
      y: 50,
      aspect: 3 / 2,
      width: 300
    }
  };
  onChange = (crop) => {
    this.setState({ crop });
  };
  render() {
    const { src, onImageLoaded, onCropComplete } = this.props;
    const { crop } = this.state;
    return (
      <ReactCrop
        src={src}
        crop={crop}
        onChange={this.onChange}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
      />
    );
  }
}
export default ImageCrop;
