const express = require('express');
const router = express.Router();
9;
const {
  createBooking,
  getBookings,
  getUserBookings,
  getReceivedBookings,
  deleteBooking
} = require('../controllers/bookings');

const { onlyAuthUser } = require('../controllers/users');
const { isUserRentalOwner } = require('../controllers/rentals');
const { route } = require('./rentals');

router.get('', getBookings);
router.get('/me', onlyAuthUser, getUserBookings);
router.get('/received', onlyAuthUser, getReceivedBookings);
router.post('', onlyAuthUser, isUserRentalOwner, createBooking);

// DELETE: /api/v1/bookings/<booking-id>

router.delete('/:bookingId', onlyAuthUser, deleteBooking);

module.exports = router;
