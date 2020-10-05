const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalShema = new Schema({
  title: {
    // * config objects
    type: String,
    required: true,
    maxlength: [128, 'Invalid length! Maxium is 128 characters']
  },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    lowercase: true,
    minlength: [4, 'Invalid length! Minimum is 4 characters']
  },
  category: { type: String, required: true, lowercase: true },
  numOfRooms: { type: Number, required: true },
  shared: Boolean,
  description: { type: String, required: true },
  dailyPrice: { type: Number, required: true },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'CloudinaryImage'
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

// - available on instance
// ? new Rental().sendError()
/* rentalShema.methods.sendError = function(res, config) {
  const { status, detail } = config;
  res.status(status).send({
    errors: [{ title: "Rental Error!", detail }]
  });
}; */

// ? Rental.sendError()
rentalShema.statics.sendError = function (res, config) {
  const { status, detail } = config;
  res.status(status).send({
    errors: [{ title: 'Rental Error!', detail }]
  });
};

module.exports = mongoose.model('Rental', rentalShema); // - Modelname, Schema
