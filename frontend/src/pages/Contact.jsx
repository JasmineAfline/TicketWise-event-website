import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xgvljjrj", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us 📩</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions or need support? Our team is here to help with bookings, events, or general inquiries. Reach out and we’ll respond promptly.
        </p>
      </section>

      {/* Contact Layout */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white shadow-lg rounded-3xl p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                rows="6"
                placeholder="Write your message here..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 transform transition-all shadow-lg disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status === "success" && <p className="mt-4 text-green-600">✅ Message sent successfully!</p>}
          {status === "error" && <p className="mt-4 text-red-600">⚠ Oops! Something went wrong. Please try again.</p>}
        </div>

        {/* Info */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-3xl p-10 flex flex-col justify-center shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="mb-4">
            Reach out to us with questions, support requests, or feedback. We love hearing from our users.
          </p>
          <ul className="space-y-4 mb-6">
            <li>📍 Nairobi, Kenya</li>
            <li>📧 support@tickewise.com</li>
            <li>📞 +254 704 988 410</li>
          </ul>
          <div className="flex gap-5 text-2xl">
            <a href="https://www.facebook.com/profile.php?id=100094311350472" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaFacebook /></a>
            <a href="https://github.com/JasmineAfline" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaGithub /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/afline-jasmine-033969292/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
