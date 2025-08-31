const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { protect } = require("../middleware/authMiddleware");

// 🎟️ Buy Ticket (creates ticket in pending status)
router.post("/buy/:eventId", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Create ticket with pending status
    const ticket = new Ticket({
      user: req.user.id,
      event: event._id,
      price: event.price,
      status: "pending",
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error("Buy ticket error:", err);
    res.status(500).json({ message: "Failed to create ticket", error: err.message });
  }
});

// 💳 Pay Ticket (simulate M-Pesa payment)
router.post("/pay/:ticketId", protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Simulate successful payment
    ticket.status = "paid";
    ticket.mpesaRef = `SIMULATED-${Date.now()}`; // store a simulated reference
    await ticket.save();

    res.json({ message: "Payment successful!", ticket });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
});

// ❌ Cancel Ticket / Refund
router.post("/cancel/:ticketId", protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (ticket.status === "paid") {
      ticket.status = "cancelled"; // simulate refund
    } else if (ticket.status === "pending") {
      ticket.status = "cancelled";
    } else {
      return res.json({ message: "Ticket already cancelled or failed", ticket });
    }

    await ticket.save();
    res.json({ message: "Ticket cancelled/refunded successfully", ticket });
  } catch (err) {
    console.error("Cancel ticket error:", err);
    res.status(500).json({ message: "Failed to cancel ticket", error: err.message });
  }
});

// 📜 View My Tickets
router.get("/mytickets", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate("event");
    res.json(tickets);
  } catch (err) {
    console.error("Get tickets error:", err);
    res.status(500).json({ message: "Failed to fetch tickets", error: err.message });
  }
});

module.exports = router;
