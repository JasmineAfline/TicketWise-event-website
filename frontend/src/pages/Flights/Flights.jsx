import React from "react";
import "./Flights.css";

function Flights() {
  return (
    <div className="flights-page">
      <section className="flights-hero">
        <h1>Book Your Flight ✈️</h1>
        <p>Find the best deals for your travels.</p>
      </section>

      <section className="flight-search">
        <form className="search-form">
          <input type="text" placeholder="From" />
          <input type="text" placeholder="To" />
          <input type="date" />
          <button type="submit">Search Flights</button>
        </form>
      </section>
    </div>
  );
}

export default Flights;
