const Payment = require("../models/Payment");
const Ticket = require("../models/Ticket");
const axios = require("axios");
const moment = require("moment");
const { getToken } = require("../utils/mpesaAuth");

/**
 * 1. Initiate STK Push
 */
exports.initiateSTKPush = async (req, res) => {
  try {
    const { ticketId, phoneNumber, quantity } = req.body;

    //  Find ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    //  Calculate total amount
    const amount = ticket.price * (quantity || 1);

    //  Create pending payment record
    const payment = await Payment.create({
      user: req.user._id,
      ticket: ticket._id,
      amount,
      phoneNumber,
      status: "pending",
    });

    //  Generate Safaricom credentials
    const token = await getToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    //  Send STK Push request
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber, // user number (must be sandbox test number!)
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: `TICKET-${ticket._id}`,
        TransactionDesc: "Event Ticket Payment",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    //  Save CheckoutRequestID
    payment.mpesaRef = response.data.CheckoutRequestID;
    await payment.save();

    res.json({
      message: "STK Push initiated",
      paymentId: payment._id,
      checkoutId: response.data.CheckoutRequestID,
    });
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "M-Pesa STK Push failed",
      error: error.response?.data || error.message,
    });
  }
};

/**
 * 2. M-Pesa Callback (Safaricom calls this URL)
 */
exports.mpesaCallback = async (req, res) => {
  console.log(" M-Pesa Callback:", JSON.stringify(req.body, null, 2));

  try {
    const callbackData = req.body.Body.stkCallback;
    const checkoutId = callbackData.CheckoutRequestID;

    if (callbackData.ResultCode === 0) {
      //  Success
      const mpesaReceipt = callbackData.CallbackMetadata.Item.find(
        (i) => i.Name === "MpesaReceiptNumber"
      ).Value;

      const amount = callbackData.CallbackMetadata.Item.find(
        (i) => i.Name === "Amount"
      ).Value;

      //  Update payment
      const payment = await Payment.findOneAndUpdate(
        { mpesaRef: checkoutId, status: "pending" },
        { status: "success", mpesaReceipt, rawCallback: callbackData },
        { new: true }
      );

      if (payment) {
        await Ticket.findByIdAndUpdate(payment.ticket, {
          status: "paid",
          mpesaReceipt,
        });
      }

      console.log(`Payment Success: ${amount}, Receipt: ${mpesaReceipt}`);
    } else {
      //  Failed transaction
      await Payment.findOneAndUpdate(
        { mpesaRef: checkoutId, status: "pending" },
        { status: "failed", rawCallback: callbackData }
      );
      console.log(` Payment Failed: ${callbackData.ResultDesc}`);
    }

    res.json({ message: "Callback processed" });
  } catch (error) {
    console.error("Callback Error:", error.message);
    res.status(500).json({ message: "Callback processing failed" });
  }
};

/**
 * 3. Simulated payment (for testing without M-Pesa)
 */
exports.simulatePayment = async (req, res) => {
  try {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = "paid";
    ticket.mpesaReceipt = "SIMULATED-" + Date.now();
    await ticket.save();

    res.json({ message: "Simulated payment successful", ticket });
  } catch (error) {
    res.status(500).json({ message: "Simulation error", error: error.message });
  }
};
