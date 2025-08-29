// src/pages/Flights/Flights.jsx
import React from "react";
import "./Flights.css";

function Flights({ embedded = false }) {
  return (
    <div className={`flights-page ${embedded ? "embedded" : ""}`}>
      {!embedded && (
        <section className="flights-hero">
          <h1>Book Your Flight ✈️</h1>
          <p>Find the best deals for your next trip.</p>
        </section>
      )}

      <section className="flight-cards">
        <div className="flight-card">
          <h3>Nairobi → Mombasa</h3>
          <p>From KES 5,000</p>
          <button className="book-btn">Book Now</button>
        </div>

        <div className="flight-card">
          <h3>Nairobi → Kisumu</h3>
          <p>From KES 4,200</p>
          <button className="book-btn">Book Now</button>
        </div>
      </section>
    </div>
  );
}

export default Flights;
