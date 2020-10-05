const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageShema = new Schema({
  url: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CloudinaryImage', imageShema);
