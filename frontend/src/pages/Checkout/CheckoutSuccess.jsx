// src/pages/Checkout/CheckoutSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

function CheckoutSuccess() {
  return (
    <div className="checkout-success">
      <h1>✅ Payment Successful!</h1>
      <p>Your ticket has been booked successfully.</p>
      <p>Check your email or SMS for confirmation details.</p>

      <Link to="/events" className="back-btn">
        Back to Events
      </Link>
    </div>
  );
}

export default CheckoutSuccess;
