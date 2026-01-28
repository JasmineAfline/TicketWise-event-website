const express = require('express');
const { createBooking, updatePaymentStatus, getUserBookings, getAllBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Create booking (logged-in users)
router.post('/', protect, createBooking);

// M-Pesa callback (no auth)
router.post('/mpesa/callback', updatePaymentStatus);

// Get bookings for logged-in user
router.get('/user', protect, getUserBookings);

// Get all bookings (Admin/Employee)
router.get('/', protect, authorize('admin', 'employee'), getAllBookings);

module.exports = router;
