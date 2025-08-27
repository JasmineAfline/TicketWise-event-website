const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');

// Public – View Events
router.get('/', getEvents);

// Employee/Admin – Create Event
router.post('/', protect, authorizeRoles('employee', 'admin'), createEvent);

// Employee/Admin – Update Event
router.put('/:id', protect, authorizeRoles('employee', 'admin'), updateEvent);

// Admin Only – Delete Event
router.delete('/:id', protect, authorizeRoles('admin'), deleteEvent);

module.exports = router;
