// backend/routes/ticketRoutes.js
const express = require("express");
const router = express.Router();
const { getToken } = require("../utils/mpesaAuth");
const axios = require("axios");
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");

// Buy ticket
router.post("/buy", async (req, res) => {
  const { phone, eventId } = req.body;

  try {
    // Find event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Get Mpesa token
    const token = await getToken();

    // Safaricom STK push (test with sandbox)
    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);
    const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: event.price,
        PartyA: phone, // Customer’s phone
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: "https://your-backend.com/api/tickets/callback",
        AccountReference: event.title,
        TransactionDesc: `Ticket for ${event.title}`,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Save ticket (pending payment)
    const ticket = new Ticket({
      event: event._id,
      userPhone: phone,
      status: "pending",
    });
    await ticket.save();

    res.json({
      message: "STK push sent. Complete payment on your phone.",
      checkoutRequestID: stkResponse.data.CheckoutRequestID,
    });
  } catch (err) {
    console.error("Ticket purchase failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
