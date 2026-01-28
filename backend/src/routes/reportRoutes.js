const express = require('express');
const { getReports } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only reports route
router.get('/', protect, authorize('admin'), getReports);

module.exports = router;
