const express = require("express");
const { initiateSTKPush, mpesaCallback } = require("../controllers/stkPushController");

const router = express.Router();

// STK Push initiation
router.post("/stkpush", initiateSTKPush);

// M-Pesa Callback
router.post("/callback", mpesaCallback);

module.exports = router;