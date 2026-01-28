import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState(null);

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
        setTimeout(() => setStatus(""), 5000);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* Header */}
      <section className="text-center mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-fade-in-down">
          Contact Us 📩
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Have questions or need support? Our team is here to help with bookings, events, or general inquiries. Reach out and we'll respond promptly.
        </p>
      </section>

      {/* Contact Layout */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10">
        {/* Form */}
        <div className="bg-white shadow-lg rounded-3xl p-10 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-left">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-all duration-300 ${
                  focused === "name"
                    ? "border-purple-500 bg-purple-50 shadow-lg"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-all duration-300 ${
                  focused === "email"
                    ? "border-purple-500 bg-purple-50 shadow-lg"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Message</label>
              <textarea
                name="message"
                rows="6"
                placeholder="Write your message here..."
                required
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none transition-all duration-300 ${
                  focused === "message"
                    ? "border-purple-500 bg-purple-50 shadow-lg"
                    : "border-gray-300"
                }`}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl hover:scale-105 hover:shadow-2xl transform transition-all shadow-lg disabled:opacity-50 font-semibold"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-green-600 text-center font-semibold animate-pulse">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-600 text-center font-semibold animate-pulse">
              ⚠ Oops! Something went wrong. Please try again.
            </p>
          )}
        </div>

        {/* Info */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-3xl p-10 flex flex-col justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-right">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="mb-4 leading-relaxed">
            Reach out to us with questions, support requests, or feedback. We love hearing from our users and are committed to providing excellent customer service.
          </p>
          <ul className="space-y-4 mb-6">
            <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
              <span className="mr-3 text-2xl">📍</span> Nairobi, Kenya
            </li>
            <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
              <span className="mr-3 text-2xl">📧</span> support@tickewise.com
            </li>
            <li className="flex items-center hover:translate-x-2 transition-transform duration-300">
              <span className="mr-3 text-2xl">📞</span> +254 704 988 410
            </li>
          </ul>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://www.facebook.com/profile.php?id=100094311350472"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 hover:scale-125 transition-all duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/JasmineAfline"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 hover:scale-125 transition-all duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 hover:scale-125 transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/afline-jasmine-033969292/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 hover:scale-125 transition-all duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
