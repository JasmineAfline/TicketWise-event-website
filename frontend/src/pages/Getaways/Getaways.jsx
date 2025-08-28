import React from "react";
import "./Getaways.css";

function Getaways() {
  return (
    <div className="getaways-page">
      <section className="getaways-hero">
        <h1>Holiday Getaways 🏖️</h1>
        <p>Find your perfect escape.</p>
      </section>

      <section className="getaway-cards">
        <div className="getaway-card">
          <img src="/images/beach.jpg" alt="Beach Resort" />
          <h3>Beach Resort</h3>
          <p>Relax by the ocean with our luxury package.</p>
        </div>

        <div className="getaway-card">
          <img src="/images/mountain.jpg" alt="Mountain Retreat" />
          <h3>Mountain Retreat</h3>
          <p>Escape to the mountains for a peaceful retreat.</p>
        </div>

        <div className="getaway-card">
          <img src="/images/city_escapes.jpg" alt="City Escape" />
          <h3>City Escape</h3>
          <p>Discover urban adventures in style.</p>
        </div>
      </section>
    </div>
  );
}

export default Getaways;
