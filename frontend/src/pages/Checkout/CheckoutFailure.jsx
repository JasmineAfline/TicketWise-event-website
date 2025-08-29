// src/pages/Checkout/CheckoutFailure.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Checkout.css"; // reuse the same CSS file as success

function CheckoutFailure() {
  return (
    <div className="checkout-failure">
      <h1>❌ Payment Failed</h1>
      <p>Something went wrong while processing your payment. Please try again.</p>
      <Link to="/events" className="back-btn">
        Back to Events
      </Link>
    </div>
  );
}

export default CheckoutFailure;
