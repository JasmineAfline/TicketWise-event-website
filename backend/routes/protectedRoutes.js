const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// ✅ Admin Only Route
router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome User! Access Granted' });
});



// ✅ Employee Only Route
router.get('/employee', protect, authorizeRoles('employee'), (req, res) => {
  res.json({ message: 'Welcome Employee!' });
});

// ✅ General User Only Route
router.get('/user', protect, authorizeRoles('user'), (req, res) => {
  res.json({ message: 'Welcome User!' });
});

module.exports = router;
