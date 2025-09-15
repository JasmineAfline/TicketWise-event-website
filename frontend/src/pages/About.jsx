export default function About() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Tickewise</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Tickewise is your all-in-one event management system designed to make organizing and attending events seamless.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 container mx-auto px-6 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-6">Our Mission 🎯</h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          At Tickewise, our mission is to connect people through events. We provide a platform where event organizers can
          easily manage their events, attendees can book tickets securely, and administrators can oversee everything with
          ease. From concerts to conferences, sports to weddings – Tickewise brings people together.
        </p>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values 💡</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">We are constantly improving our platform to make event management smarter and easier.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="text-gray-600">We prioritize secure transactions and reliable event experiences for everyone.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">Events bring people together – we exist to make that possible, anywhere and anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Join the Tickewise Experience 🎉</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Whether you are an organizer, attendee, or admin, Tickewise is built to give you the tools you need. 
          Be part of the future of event management today.
        </p>
        <a
          href="/events"
          className="bg-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-purple-500 transition"
        >
          Explore Events
        </a>
      </section>
    </div>
  );
}
