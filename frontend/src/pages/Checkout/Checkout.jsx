import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buyTicket } from "../../services/ticketsService";
import "./Checkout.css";

function Checkout() {
  const { eventId } = useParams(); // 👈 get eventId from URL (/checkout/:eventId)
  const [formData, setFormData] = useState({
    eventId: eventId || "", // pre-fill if available
    quantity: 1,
    paymentMethod: "mpesa",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Update eventId if param changes
  useEffect(() => {
    if (eventId) {
      setFormData((prev) => ({ ...prev, eventId }));
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await buyTicket(formData); // call backend with token automatically
      navigate("/checkout/success");
    } catch (err) {
      setError(err.response?.data?.message || "Ticket purchase failed");
      navigate("/checkout/failure");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {error && <p className="error">{error}</p>}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Event ID:
          <input
            type="text"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
            readOnly={!!eventId} // 👈 make it readonly if coming from link
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Payment Method:
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="mpesa">M-Pesa</option>
            <option value="card">Card</option>
          </select>
        </label>

        <button type="submit">Buy Ticket</button>
      </form>
    </div>
  );
}

export default Checkout;
