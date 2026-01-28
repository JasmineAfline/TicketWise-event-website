const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
  amount: Number,
  phoneNumber: String,
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  mpesaReceipt: String,
  checkoutRequestId: String,   // ðŸ”¹ important for callback matching
  rawCallback: Object,
}, { timestamps: true });

export default mongoose.model("Payment", PaymentSchema);


