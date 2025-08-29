// backend/controllers/ticketController.js
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const api = require("../services/mpesaService"); // your M-Pesa API wrapper
const User = require("../models/User");

// @desc Buy ticket for an event
// @route POST /api/tickets/checkout
// @access User
const checkout = async (req, res) => {
  try {
    const { eventId, amount } = req.body;
    const userId = req.user.id;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Call M-Pesa API (your service should return a payment URL or status)
    const paymentResponse = await api.initiatePayment({
      phoneNumber: req.body.phoneNumber,
      amount,
      reference: `TICKET-${eventId}-${Date.now()}`,
    });

    // Save ticket in DB with pending status
    const ticket = await Ticket.create({
      event: eventId,
      user: userId,
      price: amount,
      status: "pending",
      mpesaRef: paymentResponse.checkoutRequestID,
    });

    res.status(200).json({ ticket, paymentResponse });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};

// @desc Get user tickets
// @route GET /api/tickets
// @access User
const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate("event");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tickets", error: err.message });
  }
};

// @desc Confirm ticket payment (callback from M-Pesa)
// @route POST /api/tickets/confirm
// @access Public (called by M-Pesa)
const confirmPayment = async (req, res) => {
  try {
    const { checkoutRequestID, resultCode } = req.body;

    const ticket = await Ticket.findOne({ mpesaRef: checkoutRequestID });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = resultCode === 0 ? "paid" : "failed";
    await ticket.save();

    res.status(200).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: "Payment confirmation failed", error: err.message });
  }
};

module.exports = { checkout, getUserTickets, confirmPayment };
