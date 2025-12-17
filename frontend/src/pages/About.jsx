import { Link } from "react-router-dom";
import { FaUsers, FaGlobe, FaHandsHelping, FaBullseye } from "react-icons/fa";
import TeamTimeline from "../components/TeamTimeline";
import CompanyTimeline from "../components/CompanyTimeline";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-900">

      {/* Breadcrumb / Page Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">About Tickewise</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
            Learn who we are, what we do, and how we bring people together through events.
          </p>
          <nav className="mt-6 text-sm">
            <Link to="/" className="hover:text-yellow-400">Home</Link> /
            <span className="font-semibold ml-1">About Us</span>
          </nav>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Our Brief but Rich History 📖</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tickewise was founded in 2023 as a visionary platform aimed at revolutionizing how people discover and manage events.
            Our goal has always been to provide a seamless experience for attendees, organizers, and administrators alike.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Operating independently and responsibly, Tickewise ensures secure ticketing, transparent management, and community-driven engagement.
            Our system is built on principles of innovation, trust, and inclusivity.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80"
            alt="History"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision 🌟</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-12">
            To be the leading event management platform that connects communities, inspires experiences, and enables organizers to succeed sustainably.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <FaUsers className="text-purple-600 text-4xl mb-4 mx-auto" />
              <h3 className="font-semibold text-xl mb-2">Members & Users</h3>
              <p className="text-gray-600 text-sm">50K+ attendees and organizers active on our platform monthly.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <FaGlobe className="text-purple-600 text-4xl mb-4 mx-auto" />
              <h3 className="font-semibold text-xl mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">Connecting communities across multiple cities and regions seamlessly.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <FaHandsHelping className="text-purple-600 text-4xl mb-4 mx-auto" />
              <h3 className="font-semibold text-xl mb-2">Volunteers & Support</h3>
              <p className="text-gray-600 text-sm">Empowering local organizers and volunteers to make events successful.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <FaBullseye className="text-purple-600 text-4xl mb-4 mx-auto" />
              <h3 className="font-semibold text-xl mb-2">Beneficiaries</h3>
              <p className="text-gray-600 text-sm">Millions of attendees enjoy memorable experiences annually.</p>
            </div>
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
        <h2 className="text-3xl font-bold mb-6">Join the Tickewise Experience 🎉</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Experience seamless event management today. Whether you're an organizer or an attendee, Tickewise brings the best events to your fingertips.
        </p>
        <Link
          to="/events"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transform transition-all"
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
