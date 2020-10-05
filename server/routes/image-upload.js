// aws s3 - paid
// cloudinary - free
// multer

const express = require('express');
const router = express.Router();
const { onlyAuthUser } = require('../controllers/users');
const upload = require('../services/multer');
const { dataUri } = require('../services/dataUri');
const singleUpload = upload.single('image'); // ! image key is important
const { cloudinaryUpload } = require('../services/cloudinary');
const CloudinaryImage = require('../models/cloudinary-image');

const singleUploadController = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return res.sendApiError({
        title: 'Upload Error!',
        detail: error.message
      });
    }
    next();
  });
};

router.post('', onlyAuthUser, singleUploadController, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Image is not presented!');
    }

    const file64 = dataUri(req.file);
    const results = await cloudinaryUpload(file64.content);
    const cloudImage = new CloudinaryImage({
      url: results.secure_url,
      cloudinaryId: results.public_id
    });

    const savedImage = await cloudImage.save();
    return res.json({ _id: savedImage.id, url: savedImage.url });
  } catch (error) {
    return res.sendApiError({
      title: 'Upload Error!',
      detail: error.message
      // detail: 'Ooops, something went wrong with image upload!'
    });
  }
});

module.exports = router;
