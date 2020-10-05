const cloudinary = require('cloudinary').v2;
const config = require('../config/dev');
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET
});

exports.cloudinaryUpload = (file) =>
  cloudinary.uploader.upload(file).then().catch();
