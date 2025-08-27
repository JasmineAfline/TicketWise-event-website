const express = require('express');
const router = express.Router();

// correct relative paths (one '..' from /routes to /middleware)
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! Access Granted' });
});

router.get('/employee', protect, authorizeRoles('employee'), (req, res) => {
  res.json({ message: 'Welcome Employee!' });
});

router.get('/user', protect, authorizeRoles('user'), (req, res) => {
  res.json({ message: 'Welcome User!' });
});

module.exports = router;
