const express = require("express");
const axios = require("axios");
const moment = require("moment");
const base64 = require("base-64");
const router = express.Router();

// Load env variables
const SHORTCODE = process.env.MPESA_SHORTCODE || "174379"; // Sandbox shortcode
const PASSKEY = process.env.MPESA_PASSKEY;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;


// Helper to generate STK Push password
const generatePassword = () => {
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = base64.encode(SHORTCODE + PASSKEY + timestamp);
  return { password, timestamp };
};

// Get OAuth token from Safaricom
const getAccessToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) throw new Error("Consumer Key/Secret missing");

    const auth = base64.encode(`${consumerKey}:${consumerSecret}`);
    const { data } = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );

    console.log("Access token retrieved:", data.access_token);
    return data.access_token;
  } catch (err) {
    console.error("Failed to get access token:", err.response?.data || err.message);
    throw err;
  }
};

// POST /api/payments/:id
router.post("/:id", async (req, res) => {
  const eventId = req.params.id;
  let { phoneNumber, amount } = req.body;

  console.log("Received payment request:", { eventId, phoneNumber, amount });

  if (!phoneNumber || !amount) {
    return res.status(400).json({ error: "phoneNumber and amount are required" });
  }

  // Format phone number for M-Pesa
  if (phoneNumber.startsWith("0")) {
    phoneNumber = "+254" + phoneNumber.slice(1);
  } else if (!phoneNumber.startsWith("+254")) {
    return res.status(400).json({ error: "Phone number must start with 0 or +254" });
  }

  try {
    const token = await getAccessToken();
    const { password, timestamp } = generatePassword();

    const stkPayload = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: CALLBACK_URL,
      AccountReference: `Event-${eventId}`,
      TransactionDesc: `Payment for event ${eventId}`,
    };

    console.log("Sending STK Push payload:", stkPayload);

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPayload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("STK Push response:", response.data);
    res.json({ success: true, message: "STK Push initiated", data: response.data });
  } catch (err) {
    console.error("M-Pesa STK Push error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: "Failed to initiate payment",
      details: err.response?.data || err.message,
    });
  }
});

module.exports = router;
