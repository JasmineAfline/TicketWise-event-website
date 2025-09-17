 const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

// Mpesa credentials
const consumerKey = process.env.MPESA_CONSUMER_KEY || "GotRcUuDGv2iGCxj8dJuLK56hcQ2ZHNDZQRpxocdo7F0o8Dy";
const consumerSecret = process.env.MPESA_CONSUMER_SECRET || "vCkFXo78TjybANN6f3gaKpJDzUiRifNJL8SY0AGqK";
const shortCode = "174379";
const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

// Step 1: Generate Access Token
const generateAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Basic ${auth}` },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Access Token Error:", error.response?.data || error.message);
    throw new Error("Failed to generate access token");
  }
};

// Step 2: STK Push Request
exports.initiateSTKPush = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ message: "Phone number and amount are required" });
    }

    const token = await generateAccessToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

    const stkUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone, // Customer phone number
      PartyB: shortCode, // Paybill number
      PhoneNumber: phone,
     CallBackURL: "https://b1234abc.ngrok-free.app/api/mpesa/callback",
      AccountReference: "EventPlannerTest",
      TransactionDesc: "Event Payment",
    };

    const response = await axios.post(stkUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({
      message: "STK Push initiated",
      data: response.data,
    });
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "STK Push failed",
      error: error.response?.data || error.message,
    });
  }
};
// Handle M-Pesa Callback
exports.mpesaCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log("M-Pesa Callback Data:", JSON.stringify(callbackData, null, 2));

    // Safaricom sends callback in this structure
    const stkCallback = callbackData.Body.stkCallback;

    if (!stkCallback) {
      return res.status(400).json({ message: "Invalid callback data" });
    }

    const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    // Extract key details if payment was successful
    let amount = 0;
    let mpesaReceiptNumber = "";
    let phoneNumber = "";

    if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
      CallbackMetadata.Item.forEach(item => {
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
        if (item.Name === "PhoneNumber") phoneNumber = item.Value;
      });

      // Here you can save to DB
      console.log("✅ Payment Successful:");
      console.log("Amount:", amount);
      console.log("Receipt:", mpesaReceiptNumber);
      console.log("Phone:", phoneNumber);

      // TODO: Save payment record to database
    } else {
      console.log("❌ Payment Failed:", ResultDesc);
    }

    // Always respond with 200 to Safaricom
    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Callback Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};