const express = require('express');
const router = express.Router();
const {
  getRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getUserRentals,
  verifyUser
} = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');

// - GET /api/v1/rentals?city="berlin"
router.get('', getRentals);

// - GET /api/v1/rentals/me
router.get('/me', onlyAuthUser, getUserRentals);

router.get('/:rentalId', getRentalById);

router.get('/:rentalId/verify-user', onlyAuthUser, verifyUser);

router.post('', onlyAuthUser, createRental);

router.patch('/:rentalId', onlyAuthUser, updateRental);

router.delete('/:rentalId', onlyAuthUser, deleteRental);

module.exports = router;

// - noSQL - no tables, we're keeping data in BSON(Binary JSON) format
