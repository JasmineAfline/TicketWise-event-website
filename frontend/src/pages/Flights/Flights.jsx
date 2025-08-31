// src/pages/Flights/Flights.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Flights.css";

function Flights({ embedded = false }) {
  const navigate = useNavigate();

  const flights = [
    { id: 1, from: "Nairobi", to: "Mombasa", price: 5000 },
    { id: 2, from: "Nairobi", to: "Kisumu", price: 4200 },
    { id: 3, from: "Nairobi", to: "London", price: 120000 },
    { id: 4, from: "Nairobi", to: "New York", price: 150000 },
  ];

  const handleBook = (flight) => {
    navigate("/checkout", { state: { flight } });
  };

  return (
    <div className={`flights-page ${embedded ? "embedded" : ""}`}>
      {!embedded && (
        <section className="flights-hero">
          <h1>Book Your Flight ✈️</h1>
          <p>Find the best deals for your next trip.</p>
        </section>
      )}

      <section className="flight-cards">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <h3>{flight.from} → {flight.to}</h3>
            <p>From KES {flight.price.toLocaleString()}</p>
            <button className="book-btn" onClick={() => handleBook(flight)}>
              Book Now
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Flights;
