const verifyToken = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.name}! You have access.` });
});
