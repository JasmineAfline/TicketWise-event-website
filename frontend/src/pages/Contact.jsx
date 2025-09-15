export default function Contact() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us 📩</h1>
        <p className="text-gray-600">
          Have questions or need support? Reach out to us anytime.
        </p>
      </section>

      {/* Contact Layout */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-purple-600 text-white rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="mb-4">
            We’re here to help with bookings, events, or any questions you have.
          </p>
          <ul className="space-y-4">
            <li>📍 Nairobi, Kenya</li>
            <li>📧 support@tickewise.com</li>
            <li>📞 +254 700 123 456</li>
          </ul>
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-yellow-400">🌐</a>
            <a href="#" className="hover:text-yellow-400">📘</a>
            <a href="#" className="hover:text-yellow-400">🐦</a>
            <a href="#" className="hover:text-yellow-400">📸</a>
          </div>
        </div>
      </div>
    </div>
  );
}
