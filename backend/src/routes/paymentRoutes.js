const express = require("express");
const Ticket = require("../models/Ticket");
const { protect } = require("../middleware/authMiddleware");
const { initiateSTKPush, mpesaCallback } = require("../controllers/paymentController");

const router = express.Router();

// 🔹 1. Simulated payment (for testing without M-Pesa)
router.post("/simulate", protect, async (req, res) => {
  try {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = "paid";
    ticket.mpesaReceipt = "MPESA" + Date.now();
    await ticket.save();

    res.json({ message: "Simulated payment successful", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 2. Real M-Pesa STK Push
router.post("/stkpush", protect, initiateSTKPush);

// 🔹 3. M-Pesa Callback (Safaricom calls this URL after payment)
router.post("/callback", mpesaCallback);

module.exports = router;
