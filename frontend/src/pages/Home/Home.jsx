import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <img src="/images/hero.jpg" alt="Hero banner" className="hero-img" />
        <div className="hero-text">
          <h1>Welcome to TicketWise 🎟️</h1>
          <p>Your gateway to epic events.</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events">
        <h2>Upcoming Events</h2>
        <div className="event-list">

          <div className="event-card">
            <img src="/images/music.jpg" alt="Music Festival" />
            <h3>Music Festival</h3>
            <p>December 15, 2025</p>
          </div>

          <div className="event-card">
            <img src="/images/tech.jpg" alt="Tech Conference" />
            <h3>Tech Conference</h3>
            <p>September 5, 2025</p>
          </div>

          <div className="event-card">
            <img src="/images/food.jpg" alt="Food Carnival" />
            <h3>Food Carnival</h3>
            <p>December 20, 2025</p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;
