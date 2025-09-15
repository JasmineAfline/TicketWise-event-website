const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const api = require("../services/mpesaService"); // your M-Pesa API wrapper
// Buy a ticket (create pending)
const buyTicket = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    // Check event exists
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Create ticket in pending state
    const ticket = await Ticket.create({
      event: eventId,
      user: userId,
      price: event.price,
      status: "pending", // ✅ wait for MPESA
    });

    res.status(201).json({
      message: "Ticket created (pending payment)",
      ticket: {
        _id: ticket._id,
        event: ticket.event,
        price: ticket.price,
        status: ticket.status,
      },
    });
  } catch (err) {
    console.error("Buy ticket error:", err.message);
    res.status(500).json({ message: "Failed to create ticket", error: err.message });
  }
};

module.exports = { buyTicket };
