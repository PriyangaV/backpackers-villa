import React, { Component } from 'react';
import { uploadImage } from 'actions';
import { Spinner, ImageCrop } from 'components';
import { blobToFile, getCroppedImg } from 'helpers/functions';

class ImgSnippet {
  constructor(src, name, type) {
    this.src = src;
    this.name = name;
    this.type = type;
  }
}

class FileLoader extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.fileReader = new FileReader();
    this.originalImage = null;
    // this.selectedImage = null;
    this.state = {
      // imgBase64: '',
      selectedImg: null,
      imgStatus: 'INIT',
      croppedImg: null
      // croppedBase64: ''
    };
  }

  // > Not needed because of fileReader.onloadend
  /*  componentDidMount() {
    this.listenToFileLoading();
  }
  componentWillUnmount() {
    this.removeFileLoaderListener();
  } */

  /* listenToFileLoading = () =>
    this.fileReader.addEventListener('load', this.handleImageLoad);

  removeFileLoaderListener = () =>
    this.fileReader.removeEventListener('load', this.handleImageLoad);

  handleImageLoad = ({ target: { result: imgBase64 } }) =>
    this.setState({
      imgBase64,
      imgStatus: 'LOADED'
    }); */

  handleImageLoad = (image) => (this.originalImage = image);

  handleCropComplete = async (crop) => {
    if (!this.originalImage) return;
    // const croppedBase64 = await getCroppedImg(this.originalImage, crop);
    const croppedImg = await getCroppedImg(
      this.originalImage,
      crop,
      this.state.selectedImg.name
    );
    /* this.setState({
      croppedBase64
    }); */
    this.setState({
      croppedImg
    });
  };

  handleImageUpload = () => {
    // const { selectedImg } = this.state;
    const { croppedImg } = this.state;
    this.changeImageStatus('PENDING');
    // - blob to file conversion
    const imageToUpload = blobToFile(croppedImg);
    uploadImage(imageToUpload)
      .then((uploadedImage) => {
        this.props.onFileUpload(uploadedImage);
        this.changeImageStatus('UPLOADED');
      })
      .catch((error) => {
        console.log(error);
        this.changeImageStatus('UPLOAD_ERROR');
      });
  };

  handleChange = (event) => {
    // this.selectedImage = event.target.files[0];
    const file = event.target.files[0];
    this.fileReader.onloadend = (event) => {
      const selectedImg = new ImgSnippet(
        event.target.result,
        file.name,
        file.type
      );
      this.setState({ selectedImg, imgStatus: 'LOADED' });
      /* this.setState({
        imgBase64,
        imgStatus: 'LOADED'
      }); */
    };
    // this.fileReader.readAsDataURL(this.selectedImage);
    this.fileReader.readAsDataURL(file);
  };

  changeImageStatus = (imgStatus) => this.setState({ imgStatus });

  cancelImage = () => {
    // this.selectedImage = null;
    // this.setState({ selectedImg: null, imgStatus: 'INIT', croppedBase64: '' });
    this.setState({ selectedImg: null, imgStatus: 'INIT', croppedImg: null });
    this.inputRef.current.value = null;
    this.originalImage = null;
  };

  render() {
    // const { imgBase64, imgStatus } = this.state;
    // const { selectedImg, imgStatus, croppedBase64 } = this.state;
    const { selectedImg, imgStatus, croppedImg } = this.state;
    return (
      <div className="img-upload-container">
        <label className="img-upload btn">
          <span className="upload-text">Select an image</span>
          <input
            ref={this.inputRef}
            name="image"
            type="file"
            className="form-control"
            accept=".jpg, .jpeg, .png"
            onChange={this.handleChange}
          />
        </label>
        {selectedImg && (
          <div className="img-crop-container">
            <ImageCrop
              src={selectedImg.src}
              onImageLoaded={this.handleImageLoad}
              onCropComplete={this.handleCropComplete}
            />
          </div>
        )}
        {selectedImg && (
          <>
            <div className="img-preview-container">
              <div className="img-preview">
                {/* <img
                  src={croppedBase64 || selectedImg.src}
                  alt="rental-asset"
                /> */}
                <img
                  src={(croppedImg && croppedImg.url) || selectedImg.src}
                  alt="rental-asset"
                />
              </div>
              {imgStatus === 'PENDING' && (
                <div className="spinner-container">
                  <Spinner />
                </div>
              )}
              {imgStatus === 'UPLOADED' && (
                <div className="alert alert-success-box upload-result">
                  Image has been successfully uploaded!
                </div>
              )}
              {imgStatus === 'UPLOAD_ERROR' && (
                <div className="alert alert-danger-box upload-result">
                  Image upload failed!
                </div>
              )}
            </div>
            <div className="upload-img-buttons">
              {imgStatus !== 'UPLOADED' && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={this.cancelImage}
                >
                  cancel
                </button>
              )}
              {imgStatus === 'LOADED' && (
                <button
                  className="btn"
                  type="button"
                  onClick={this.handleImageUpload}
                >
                  upload
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}
export default FileLoader;
