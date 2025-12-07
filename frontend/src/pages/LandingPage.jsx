import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Button({ children, className }) {
  return (
    <button
      className={`px-8 py-4 rounded-xl font-semibold transition shadow-lg ripple glow ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover-lift ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

function EventCard({ image, title, date, location, price, badge, isPopular }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {badge && (
          <div className={`absolute top-4 right-4 badge ${isPopular ? 'badge-popular' : 'badge-sold-out'}`}>
            {badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{date}</p>
        <p className="text-gray-600 mb-4">{location}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-600">KSh {price}</span>
          <Link to="/events">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-500 hover:to-pink-400 ripple glow">
              Buy Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ name, rating, comment, avatar }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift fade-in">
      <div className="flex items-center mb-4">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-bold">{name}</h4>
          <div className="star-rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < rating ? '' : 'opacity-30'}`}>★</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{comment}"</p>
    </div>
  );
}

export default function LandingPage() {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    // Observe elements
    const elements = ['browse-events', 'book-tickets', 'enjoy-show'];
    elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section with Video Background */}
<section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
  {/* Background Video */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/istockphoto-1402272161-640_adpp_is.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Animated Gradient Overlay */}
  <div className="absolute top-0 left-0 w-full h-full gradient-bg opacity-80"></div>

  {/* Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

  {/* Hero Content */}
  <div className="relative z-10 px-6 max-w-4xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
      Welcome to Ticketwise
    </h1>
    <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 drop-shadow-md">
      Your all-in-one event management platform. Discover, book, and
      manage events with ease. Whether you're an organizer, attendee, or
      admin – Tickewise has you covered.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link to="/events">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 px-8 py-4 rounded-xl text-lg font-bold shadow-2xl glow transform hover:scale-105 transition-all duration-300">
          Explore Events
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-500 hover:to-pink-400 px-8 py-4 rounded-xl text-lg font-bold shadow-2xl glow transform hover:scale-105 transition-all duration-300">
          Get Started
        </button>
      </Link>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Tickewise?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">🎯 Easy to Use</h3>
              <p>Browse events and book tickets in just a few clicks.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">💳 Secure Payments</h3>
              <p>Pay safely with M-Pesa, PayPal, or your credit card.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">📊 For Everyone</h3>
              <p>Admins, employees, and users each get tailored tools.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Explore Event Categories</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["Concerts", "Conferences", "Sports", "Weddings"].map((cat) => (
              <div
                key={cat}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div id="browse-events" className={`slide-in-left ${visibleElements.has('browse-events') ? 'visible' : ''}`}>
            <span className="text-5xl">🔎</span>
            <h3 className="text-xl font-semibold mt-4">Browse Events</h3>
            <p className="text-gray-600 mt-2">
              Find concerts, sports, conferences and more near you.
            </p>
          </div>
          <div id="book-tickets" className={`fade-in ${visibleElements.has('book-tickets') ? 'visible' : ''}`}>
            <span className="text-5xl">🎟️</span>
            <h3 className="text-xl font-semibold mt-4">Book Tickets</h3>
            <p className="text-gray-600 mt-2">
              Secure your spot instantly with safe and easy payments.
            </p>
          </div>
          <div id="enjoy-show" className={`slide-in-right ${visibleElements.has('enjoy-show') ? 'visible' : ''}`}>
            <span className="text-5xl">🎉</span>
            <h3 className="text-xl font-semibold mt-4">Enjoy the Show</h3>
            <p className="text-gray-600 mt-2">
              Attend and experience unforgettable moments.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <EventCard
              image="/images/tech_event.jpg"
              title="Tech Conference 2024"
              date="March 15, 2024"
              location="Nairobi, Kenya"
              price="2500"
              badge="Popular"
              isPopular={true}
            />
            <EventCard
              image="/images/Music.jpg"
              title="Summer Music Festival"
              date="April 20, 2024"
              location="Mombasa, Kenya"
              price="1500"
              badge="Sold Out"
              isPopular={false}
            />
            <EventCard
              image="/images/food_carnival.jpg"
              title="Food & Wine Carnival"
              date="May 10, 2024"
              location="Kisumu, Kenya"
              price="800"
            />
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ReviewCard
            name="Sarah Johnson"
            rating={5}
            comment="Amazing platform! Booking tickets has never been easier. The interface is intuitive and the payment process is seamless."
            avatar="https://via.placeholder.com/48x48/FF6B81/FFFFFF?text=SJ"
          />
          <ReviewCard
            name="Michael Chen"
            rating={5}
            comment="As an event organizer, TicketWise has transformed how I manage my events. Highly recommend to everyone!"
            avatar="https://via.placeholder.com/48x48/1B74E4/FFFFFF?text=MC"
          />
          <ReviewCard
            name="Emma Davis"
            rating={4}
            comment="Great selection of events and the customer support is excellent. Will definitely use again for future events."
            avatar="https://via.placeholder.com/48x48/8E44AD/FFFFFF?text=ED"
          />
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Experience the Future of Events?
        </h2>
        <Link to="/register">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  );
}
