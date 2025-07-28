const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// DELETE a user by email – only for development/testing!
router.delete('/delete/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOneAndDelete({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: `Deleted user ${email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
