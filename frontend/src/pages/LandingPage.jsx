import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewCard from "../components/ReviewCard";
import FAQSection from "../components/FAQSection";
import { Sparkles, Calendar, MapPin, ArrowRight, Star, Users, Shield, Zap } from "lucide-react";

function Button({ children, className, icon }) {
  return (
    <button className={`group px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 ${className}`}>
      {children}
      {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
    </button>
  );
}

function CategoryCard({ title, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group">
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">{title}</h3>
    </div>
  );
}

function EventCard({ id, title, date, location, price, image, onClick }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer">
      <div className="relative overflow-hidden">
        <img src={image} alt={title} className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Star size={14} fill="currentColor" />
          <span>Popular</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">{title}</h3>
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <Calendar size={16} className="text-purple-500" />
            {date}
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <MapPin size={16} className="text-purple-500" />
            {location}
          </p>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="font-bold text-2xl text-purple-600">KSh {price}</span>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <span>View</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  
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

  const handleEventCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  return (
    <div className="bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/istockphoto-1402272161-640_adpp_is.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/70 to-black/70" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-bounce-slow">
            <Sparkles className="text-yellow-400" size={20} />
            <span className="text-sm font-medium">Your Gateway to Amazing Events</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent animate-fade-in">
            Welcome to TicketWise
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-200 animate-fade-in animation-delay-200">
            Discover, book and manage events with ease.
          </p>
          
          <div className="flex gap-4 justify-center animate-fade-in animation-delay-300">
            <Link to="/events">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                icon={<ArrowRight size={20} />}
              >
                Explore Events
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in animation-delay-600">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-sm text-gray-300">Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-sm text-gray-300">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-sm text-gray-300">Organizers</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="text-white" size={32} />}
            title="Instant Booking"
            description="Book your tickets in seconds with our lightning-fast checkout process."
          />
          <FeatureCard
            icon={<Shield className="text-white" size={32} />}
            title="Secure Payments"
            description="Your transactions are protected with bank-level security encryption."
          />
          <FeatureCard
            icon={<Users className="text-white" size={32} />}
            title="24/7 Support"
            description="Our dedicated team is always here to help you with any questions."
          />
        </div>
      </section>

      {/* EVENT CATEGORIES */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Event Categories
          </h2>
          <p className="text-gray-600 text-lg">Find the perfect event for every occasion</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard title="Concerts" icon="🎵" />
          <CategoryCard title="Conferences" icon="🎤" />
          <CategoryCard title="Sports" icon="🏆" />
          <CategoryCard title="Festivals" icon="🎉" />
        </div>
      </section>

      {/* MOST POPULAR EVENTS */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Most Popular Events
            </h2>
            <p className="text-gray-600 text-lg">Don't miss out on these trending events</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <EventCard
              id="1"
              title="Nairobi Music Fest"
              date="12 Aug 2025"
              location="Nairobi"
              price="2500"
              image="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
              onClick={() => handleEventCardClick("nairobi-music-fest")}
            />
            <EventCard
              id="2"
              title="Tech Innovators Summit"
              date="20 Sep 2025"
              location="Westlands"
              price="5000"
              image="https://images.unsplash.com/photo-1540575467063-178a50c2df87"
              onClick={() => handleEventCardClick("tech-summit")}
            />
            <EventCard
              id="3"
              title="Comedy Night Live"
              date="05 Oct 2025"
              location="CBD"
              price="1500"
              image="https://images.unsplash.com/photo-1515168833906-d2a3b82b302a"
              onClick={() => handleEventCardClick("comedy-night")}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg">Join thousands of satisfied customers</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsData.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </section>

       {/* FAQ SECTION */}
      <FAQSection />

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white py-20 text-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="text-yellow-400" size={20} />
            <span className="text-sm font-medium">Start Your Journey Today</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Better Events?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join TicketWise and discover amazing events happening near you
          </p>
          
          <Link to="/register">
            <Button 
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg"
              icon={<ArrowRight size={24} />}
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

    </div>
  );
}
