const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["unpaid", "paid", "cancelled"], 
    default: "unpaid"
  },
  mpesaReceipt: {
    type: String,
  }
}, { timestamps: true }); //  adds createdAt & updatedAt automatically

module.exports = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
