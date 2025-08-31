const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// ✅ General profile route for any authenticated user
router.get('/profile', protect, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});

// ✅ Admin-only route
router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin! Access Granted' });
});

// ✅ Employee-only route
router.get('/employee', protect, authorizeRoles('employee'), (req, res) => {
  res.json({ message: 'Welcome Employee!' });
});

// ✅ User-only route
router.get('/user', protect, authorizeRoles('user'), (req, res) => {
  res.json({ message: 'Welcome User!' });
});

module.exports = router;
