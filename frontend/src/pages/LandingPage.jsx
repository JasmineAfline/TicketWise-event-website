import { Link } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import FAQSection from "../components/FAQSection";
import { motion } from "framer-motion"; // for animations

function Button({ children, className }) {
  return (
    <button className={`px-8 py-4 rounded-xl font-semibold shadow-lg ${className}`}>
      {children}
    </button>
  );
}

function CategoryCard({ title, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl p-6 text-center transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  );
}

function EventCard({ title, date, location, price, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-5">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{date}</p>
        <p className="text-gray-600 text-sm mb-4">{location}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-purple-600">KES {price}</span>
          <Link to="/events">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Buy Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const testimonialsData = [
    {
      name: "Sarah Johnson",
      comment: "Booking tickets on TicketWise is fast and stress-free. I love the clean interface.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Michael Chen",
      comment: "As an event organizer, managing events has never been this easy.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=45",
    },
    {
      name: "Emma Davis",
      comment: "Great events, smooth payments, and reliable customer support.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "John Smith",
      comment: "TicketWise makes event booking simple and secure.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=18",
    },
  ];
      

  
  return (
    <div className="bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-white text-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/istockphoto-1402272161-640_adpp_is.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to TicketWise
          </h1>
          <p className="text-xl mb-8">
            Discover, book and manage events with ease.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/events">
              <Button className="bg-yellow-400 text-black">
                Explore Events
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* EVENT CATEGORIES */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Event Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard title="Concerts" icon="🎵" />
          <CategoryCard title="Conferences" icon="🎤" />
          <CategoryCard title="Sports" icon="🏆" />
          <CategoryCard title="Festivals" icon="🎉" />
        </div>
      </section>

      {/* MOST POPULAR EVENTS */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Most Popular Events
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <EventCard
              title="Nairobi Music Fest"
              date="12 Aug 2025"
              location="Nairobi"
              price="2500"
              image="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
            />
            <EventCard
              title="Tech Innovators Summit"
              date="20 Sep 2025"
              location="Westlands"
              price="5000"
              image="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
            />
            <EventCard
              title="Comedy Night Live"
              date="05 Oct 2025"
              location="CBD"
              price="1500"
              image="https://images.unsplash.com/photo-1515168833906-d2a3b82b302a"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </section>

       {/* FAQ SECTION */}
      <FAQSection />

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Experience Better Events?
        </h2>
        <Link to="/register">
          <Button className="bg-yellow-400 text-black text-lg">
            Get Started
          </Button>
        </Link>
      </section>

    </div>
  );
}
