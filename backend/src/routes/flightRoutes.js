const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createFlight, getFlights, getFlightById, updateFlight, deleteFlight } = require('../controllers/flightController');

// Public routes
router.get('/', getFlights);
router.get('/:id', getFlightById);

// Protected routes (Employee/Admin)
router.post('/', protect, createFlight);
router.put('/:id', protect, updateFlight);
router.delete('/:id', protect, deleteFlight);

module.exports = router;
