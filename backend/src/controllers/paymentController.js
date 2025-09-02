const Payment = require("../models/Payment")

// STK Push
exports.initiateSTKPush = async (req, res) => {
  try {
    const { ticketId, phoneNumber, amount } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Save pending payment record
    const payment = await Payment.create({
      user: req.user._id,
      ticket: ticket._id,
      amount,
      phoneNumber,
      status: "pending",
    });

    const token = await getToken();
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: ticket._id.toString(), //  pass ticketId so callback can find ticket
        TransactionDesc: "Event Ticket Payment",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({
      message: "STK Push initiated",
      data: response.data,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      message: "M-Pesa STK Push failed",
      error: error.response?.data || error.message,
    });
  }
};

// Callback
exports.mpesaCallback = async (req, res) => {
  console.log("M-Pesa Callback:", JSON.stringify(req.body, null, 2));

  try {
    const callbackData = req.body.Body.stkCallback;
    const accountRef = callbackData?.AccountReference; //  our ticketId
    const ticketId = accountRef;

    if (callbackData.ResultCode === 0) {
      const mpesaReceipt = callbackData.CallbackMetadata.Item.find(
        (i) => i.Name === "MpesaReceiptNumber"
      ).Value;

      const amount = callbackData.CallbackMetadata.Item.find(
        (i) => i.Name === "Amount"
      ).Value;

      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { ticket: ticketId, status: "pending" },
        {
          status: "success",
          mpesaReceipt,
          rawCallback: callbackData,
        },
        { new: true }
      );

      // Update ticket
      if (payment) {
        await Ticket.findByIdAndUpdate(ticketId, {
          status: "paid",
          mpesaReceipt,
        });
      }

      console.log(`Payment received: ${amount}, Receipt: ${mpesaReceipt}`);
    } else {
      // Payment failed
      await Payment.findOneAndUpdate(
        { ticket: ticketId, status: "pending" },
        {
          status: "failed",
          rawCallback: callbackData,
        }
      );
    }

    res.json({ message: "Callback processed" });
  } catch (error) {
    console.error("Callback error:", error.message);
    res.status(500).json({ message: "Callback processing failed" });
  }
};
