import { Link } from "react-router-dom";
import { FaUsers, FaGlobe, FaHandsHelping, FaBullseye } from "react-icons/fa";
import { useEffect, useState } from "react";
import TeamTimeline from "../components/TeamTimeline";
import CompanyTimeline from "../components/CompanyTimeline";

export default function About() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const revealOnScroll = (index) => {
    return {
      opacity: scrollPosition > 100 ? 1 : 0,
      transform: scrollPosition > 100 ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s ease-out ${index * 0.1}s`,
    };
  };

  return (
    <div className="bg-gray-50 text-gray-900">

      {/* Breadcrumb / Page Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full animate-bounce"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in-down">About Tickewise</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            Learn who we are, what we do, and how we bring people together through events.
          </p>
          <nav className="mt-6 text-sm animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link> /
            <span className="font-semibold ml-1">About Us</span>
          </nav>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2" style={revealOnScroll(0)}>
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Our Brief but Rich History 📖</h2>
          <p className="text-gray-700 leading-relaxed mb-4 hover:text-gray-900 transition-colors">
            Tickewise was founded in 2023 as a visionary platform aimed at revolutionizing how people discover and manage events.
            Our goal has always been to provide a seamless experience for attendees, organizers, and administrators alike.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 hover:text-gray-900 transition-colors">
            Operating independently and responsibly, Tickewise ensures secure ticketing, transparent management, and community-driven engagement.
            Our system is built on principles of innovation, trust, and inclusivity.
          </p>
        </div>
        <div className="md:w-1/2 transform hover:scale-105 transition-transform duration-500">
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80"
            alt="History"
            className="rounded-2xl shadow-lg w-full object-cover hover:shadow-2xl transition-shadow duration-300"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in">Our Vision 🌟</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12 animate-fade-in" style={{animationDelay: "0.2s"}}>
            To be the leading event management platform that connects communities, inspires experiences, and enables organizers to succeed sustainably.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FaUsers, title: "Members & Users", desc: "50K+ attendees and organizers active on our platform monthly." },
              { icon: FaGlobe, title: "Global Reach", desc: "Connecting communities across multiple cities and regions seamlessly." },
              { icon: FaHandsHelping, title: "Volunteers & Support", desc: "Empowering local organizers and volunteers to make events successful." },
              { icon: FaBullseye, title: "Beneficiaries", desc: "Millions of attendees enjoy memorable experiences annually." },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group"
                style={revealOnScroll(index)}
              >
                <card.icon className="text-purple-600 text-4xl mb-4 mx-auto group-hover:text-pink-500 transition-colors" />
                <h3 className="font-semibold text-xl mb-2 group-hover:text-purple-600 transition-colors">{card.title}</h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission 🎯</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-center mb-4">
          Tickewise enables communities to organize and attend events with ease. We work with organizers to manage events securely, ensure smooth ticketing, and deliver memorable experiences for attendees. By leveraging technology, we aim to transform event management into a streamlined, enjoyable, and inclusive process.
        </p>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-center">
          From intimate workshops to large concerts, Tickewise is designed to support events of all scales, empower communities, and foster meaningful connections.
        </p>
      </section>

      {/* Core Values */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values 💡</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl mb-2">Service to Humanity</h3>
              <p className="text-gray-600 text-sm">We prioritize the well-being of our community and attendees.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl mb-2">Accountability</h3>
              <p className="text-gray-600 text-sm">We are transparent and responsible in every interaction.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl mb-2">Community Centered</h3>
              <p className="text-gray-600 text-sm">We focus on building and empowering communities through events.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl mb-2">Inclusivity & Innovation</h3>
              <p className="text-gray-600 text-sm">We embrace diversity and innovate to make events accessible for all.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Join the Tickewise Experience 🎉</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8 hover:text-gray-900 transition-colors">
          Experience seamless event management today. Whether you're an organizer or an attendee, Tickewise brings the best events to your fingertips.
        </p>
        <Link
          to="/events"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-110 hover:shadow-2xl transform transition-all duration-300"
        >
          Explore Events
        </Link>
      </section>

      {/* Add Team Timeline */}
      <TeamTimeline />

      {/* Company Journey Timeline */}
      <CompanyTimeline />
    </div>
  );
}
