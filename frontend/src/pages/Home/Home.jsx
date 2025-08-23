Home.jsx
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to TicketWise 🎟️</h1>
          <p>Your gateway to epic events, flights, and more.</p>
          <button className="get-started-btn">Get Started</button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          <div className="event-card">
            <img src="/assets/images/music-festival.jpg" alt="Music Festival" />
            <h3>Music Festival</h3>
            <p>May 15, 2025</p>
          </div>
          <div className="event-card">
            <img src="/assets/images/tech-event.jpg" alt="Tech Conference" />
            <h3>Tech Conference</h3>
            <p>June 5, 2025</p>
          </div>
          <div className="event-card">
            <img src="/assets/images/food-carnival.jpg" alt="Food Carnival" />
            <h3>Food Carnival</h3>
            <p>July 20, 2025</p>
          </div>
        </div>
      </section>

      {/* Cheap Flights Section */}
      <section className="flights-section">
        <h2>Cheap Flights</h2>
        <div className="flights-grid">
          <div className="flight-card">
            <h3>Nairobi → Mombasa</h3>
            <p>From Ksh 3,500</p>
          </div>
          <div className="flight-card">
            <h3>Nairobi → Kisumu</h3>
            <p>From Ksh 4,200</p>
          </div>
        </div>
      </section>

      {/* Weekend Getaways */}
      <section className="weekend-section">
        <h2>Weekend Getaways</h2>
        <div className="weekend-grid">
          <div className="weekend-card">
            <h3>Diani Beach</h3>
            <p>Relaxing beach package</p>
          </div>
          <div className="weekend-card">
            <h3>Naivasha</h3>
            <p>2 Days 1 Night Safari</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;