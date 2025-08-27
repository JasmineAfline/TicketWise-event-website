const express = require("express");
const Ticket = require("../models/Ticket");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Simulate payment
router.post("/mpesa", protect, async (req, res) => {
  try {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // simulate payment success
    ticket.status = "paid";
    ticket.mpesaReceipt = "MPESA" + Date.now();
    await ticket.save();

    res.json({ message: "Payment successful", ticket });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
