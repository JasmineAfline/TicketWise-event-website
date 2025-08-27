const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { protect } = require("../middleware/authMiddleware");

// 🎟️ Buy Ticket
router.post("/buy/:eventId", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Create new ticket (pending until payment)
    const ticket = new Ticket({
      user: req.user.id,
      event: event._id,
      status: "pending",
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 💳 Pay for Ticket (simulate M-Pesa payment)
router.post("/pay/:ticketId", protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    ticket.status = "paid"; // simulate M-Pesa success
    await ticket.save();

    res.json({ message: "Payment successful!", ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ Cancel or Refund Ticket
router.post("/cancel/:ticketId", protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (ticket.status === "paid") {
      ticket.status = "cancelled"; // simulate refund
      await ticket.save();
      return res.json({ message: "Ticket refunded successfully", ticket });
    }

    if (ticket.status === "pending") {
      ticket.status = "cancelled";
      await ticket.save();
      return res.json({ message: "Ticket cancelled", ticket });
    }

    res.json({ message: "Ticket already cancelled", ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📜 View My Tickets
router.get("/mytickets", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate("event");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
