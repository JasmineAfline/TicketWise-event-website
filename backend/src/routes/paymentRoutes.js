const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  initiateSTKPush,
  mpesaCallback,
  simulatePayment,
} = require("../controllers/paymentController");

const router = express.Router();

// 1. Sandbox simulation
router.post("/simulate", protect, simulatePayment);

// 2. Real STK Push
router.post("/stkpush", protect, initiateSTKPush);

// 3. Callback (Safaricom calls this directly)
router.post("/callback", mpesaCallback);

module.exports = router;
