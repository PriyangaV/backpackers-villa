// const rentals = require("./data/rentals");
const { rentals, users, images } = require('./data');
const Rental = require('../models/rental');
const User = require('../models/user');
const Booking = require('../models/booking');
const CloudinaryImage = require('../models/cloudinary-image');

class FakeDB {
  async clear() {
    await Rental.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
    await CloudinaryImage.deleteMany({});
  }
  async addData() {
    await Rental.create(rentals);
    await User.create(users);
    await CloudinaryImage.create(images);
  }
  async populate() {
    await this.clear();
    await this.addData();
  }
}

module.exports = FakeDB;
