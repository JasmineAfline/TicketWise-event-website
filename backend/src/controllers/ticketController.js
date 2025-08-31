const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const api = require("../services/mpesaService"); // your M-Pesa API wrapper

// 🎟️ Checkout - start M-Pesa payment
const checkout = async (req, res) => {
  try {
    const { eventId, amount, phoneNumber } = req.body;
    const userId = req.user.id;

    // Check event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Call M-Pesa API
    const paymentResponse = await api.initiatePayment({
      phoneNumber,
      amount,
      reference: `TICKET-${eventId}-${Date.now()}`,
    });

    // Save ticket (pending)
    const ticket = await Ticket.create({
      event: eventId,
      user: userId,
      price: amount,
      status: "pending",
      mpesaRef: paymentResponse.CheckoutRequestID, // Safaricom field
    });

    res.status(200).json({ ticket, paymentResponse });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};

// 📜 Get user tickets
const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate("event");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tickets", error: err.message });
  }
};

// ✅ Confirm payment (Safaricom callback)
const confirmPayment = async (req, res) => {
  try {
    const { Body } = req.body; // Safaricom sends "Body.stkCallback"
    const callback = Body?.stkCallback;

    if (!callback) return res.status(400).json({ message: "Invalid callback" });

    const { CheckoutRequestID, ResultCode } = callback;

    // Find ticket
    const ticket = await Ticket.findOne({ mpesaRef: CheckoutRequestID });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Update status
    ticket.status = ResultCode === 0 ? "paid" : "failed";
    await ticket.save();

    res.status(200).json({ ticket });
  } catch (err) {
    console.error("Confirm error:", err);
    res.status(500).json({ message: "Payment confirmation failed", error: err.message });
  }
};

module.exports = { checkout, getUserTickets, confirmPayment };
