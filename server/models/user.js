const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// eslint-disable-next-line
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userShema = new Schema({
  username: {
    type: String,
    lowercase: true,
    minlength: [4, 'Invalid length! Minimum is 4 characters'],
    maxlength: [32, 'Invalid length! Maximum is 32 characters']
  },
  email: {
    type: String,
    required: 'Email is required!',
    lowercase: true,
    minlength: [4, 'Invalid length! Minimum is 4 characters'],
    maxlength: [32, 'Invalid length! Maximum is 32 characters'],
    unique: true,
    match: EMAIL_PATTERN
  },
  password: {
    type: String,
    required: 'Password is required!',
    minlength: [4, 'Invalid length! Minimum is 4 characters'],
    maxlength: [32, 'Invalid length! Maximum is 32 characters']
  }
});

userShema.pre('save', function (next) {
  const user = this; // to access this, using normal function instead of arrow
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

userShema.methods.hasSamePassword = function (providedPassword) {
  // const user = this;
  return bcrypt.compareSync(providedPassword, this.password);
};

module.exports = mongoose.model('User', userShema); // - Modelname, Schema
