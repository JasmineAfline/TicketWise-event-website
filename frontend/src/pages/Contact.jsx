import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xgvljjrj", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/*  Feedback messages */}
          {status === "success" && (
            <p className="mt-4 text-green-600">✅ Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-600">
               Oops! Something went wrong. Please try again.
            </p>
          )}
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
            <li>📞 +254 704 988 410</li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-4 mt-6 text-2xl">
            <a
             href="https://www.facebook.com/profile.php?id=100094311350472"
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-yellow-400"
          >
            <FaFacebook />
            </a>
            
            <a
              href="https://github.com/JasmineAfline"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/accounts/password/reset/?source=fxcal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <FaInstagram />
            </a>
              <a
              href="https://www.linkedin.com/in/afline-jasmine-033969292/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
           >
           <FaLinkedin />
           </a>
          </div>
        </div>
      </div>
    </div>
  );
}
