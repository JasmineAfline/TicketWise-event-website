// backend/src/routes/ticketRoutes.js
const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const { protect } = require("../middleware/authMiddleware");

//  Buy Ticket
router.post("/buy/:eventId", protect, async (req, res) => {
  try {
    const { eventId } = req.params;

    // ✅ Validate ObjectId before querying
    if (!eventId || eventId.length !== 24) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Create ticket
    const ticket = new Ticket({
      user: req.user.id,
      event: event._id,
      price: event.price,
      status: "paid", // simulate instant payment
      mpesaReceipt: `SIMULATED-${Date.now()}`,
    });

    await ticket.save();

    res.status(201).json({ message: "Ticket created & paid successfully", ticket });
  } catch (err) {
    console.error("Buy ticket error:", err);
    res.status(500).json({ message: "Failed to create ticket", error: err.message });
  }
});

//  Cancel Ticket
router.post("/cancel/:ticketId", protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (ticket.status === "paid" || ticket.status === "unpaid") {
      ticket.status = "cancelled";
    } else {
      return res.json({ message: "Ticket already cancelled", ticket });
    }

    await ticket.save();
    res.json({ message: "Ticket cancelled/refunded successfully", ticket });
  } catch (err) {
    console.error("Cancel ticket error:", err);
    res.status(500).json({ message: "Failed to cancel ticket", error: err.message });
  }
});

//  View My Tickets
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
