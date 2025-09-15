import { Link } from "react-router-dom";

function Button({ children, className }) {
  return (
    <button
      className={`px-8 py-4 rounded-xl font-semibold transition shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section with Video Background */}
<section className="relative h-screen flex items-center justify-center text-center text-white">
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

  {/* Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

  {/* Hero Content */}
  <div className="relative z-10 px-6">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">
      Welcome to Tickewise 
    </h1>
    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
      Your all-in-one event management platform. Discover, book, and
      manage events with ease. Whether you’re an organizer, attendee, or
      admin – Tickewise has you covered.
    </p>
    <Link to="/events">
      <button className="bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 rounded-xl text-lg shadow-lg">
        Explore Events
      </button>
    </Link>
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
          <div>
            <span className="text-5xl">🔎</span>
            <h3 className="text-xl font-semibold mt-4">Browse Events</h3>
            <p className="text-gray-600 mt-2">
              Find concerts, sports, conferences and more near you.
            </p>
          </div>
          <div>
            <span className="text-5xl">🎟️</span>
            <h3 className="text-xl font-semibold mt-4">Book Tickets</h3>
            <p className="text-gray-600 mt-2">
              Secure your spot instantly with safe and easy payments.
            </p>
          </div>
          <div>
            <span className="text-5xl">🎉</span>
            <h3 className="text-xl font-semibold mt-4">Enjoy the Show</h3>
            <p className="text-gray-600 mt-2">
              Attend and experience unforgettable moments.
            </p>
          </div>
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
