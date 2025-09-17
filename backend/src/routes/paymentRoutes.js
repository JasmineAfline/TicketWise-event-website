const express = require("express");
const router = express.Router();
const { initiateSTKPush, mpesaCallback } = require("../controllers/paymentController");

// Initiate STK Push
router.post("/initiate", initiateSTKPush);

// Safaricom will hit this URL after payment
router.post("/callback", mpesaCallback);

module.exports = router;
