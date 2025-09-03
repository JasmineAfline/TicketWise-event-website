// src/pages/Events/BuyTicket.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

const BuyTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    try {
      const res = await api.post("/payments/stkpush", {
        ticketId,
        phoneNumber,
        quantity,
      });

      setMessage("✅ STK Push sent! Check your phone.");
      console.log("Payment response:", res.data);

      // Navigate to checkout success page after a few seconds
      setTimeout(() => navigate("/checkout/success"), 3000);
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      setMessage("❌ Payment Failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Buy Ticket</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number (254...)</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="e.g. 254708374149"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Payment Method</label>
        <select className="w-full border px-3 py-2 rounded">
          <option value="mpesa">M-Pesa</option>
        </select>
      </div>

      <button
        onClick={handleBuy}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Buy Ticket
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default BuyTicket;
