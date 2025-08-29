import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 👈 import auth
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register"); // sends user to Register page
  };

  const handleBuyClick = (eventId) => {
    if (!user) {
      navigate("/login"); // 👈 force login first
    } else {
      navigate(`/checkout/${eventId}`); // 👈 logged in → checkout
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to TicketWise 🎟️</h1>
          <p>Your gateway to epic events.</p>

          {/* ✅ Button adapts to login state */}
          <button className="hero-btn" onClick={() => handleBuyClick(1)}>
            {user ? "Buy Ticket" : "Login to Buy"}
          </button>

          <button className="cta-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events">
        <h2>Upcoming Events</h2>
        <div className="event-list">
          <div className="event-card">
            <img src="/images/music_festival.jpg" alt="Music Festival" />
            <h3>Music Festival</h3>
            <p>December 15, 2025</p>
            <p><strong>Price:</strong> KES 1,500</p>
            <button onClick={() => handleBuyClick(1)} className="buy-btn">
              {user ? "Buy Ticket" : "Login to Buy"}
            </button>
          </div>

          <div className="event-card">
            <img src="/images/tech_event.jpg" alt="Tech Conference" />
            <h3>Tech Conference</h3>
            <p>September 5, 2025</p>
            <p><strong>Price:</strong> KES 3,000</p>
            <button onClick={() => handleBuyClick(2)} className="buy-btn">
              {user ? "Buy Ticket" : "Login to Buy"}
            </button>
          </div>

          <div className="event-card">
            <img src="/images/food_carnival.jpg" alt="Food Carnival" />
            <h3>Food Carnival</h3>
            <p>December 20, 2025</p>
            <p><strong>Price:</strong> KES 800</p>
            <button onClick={() => handleBuyClick(3)} className="buy-btn">
              {user ? "Buy Ticket" : "Login to Buy"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
