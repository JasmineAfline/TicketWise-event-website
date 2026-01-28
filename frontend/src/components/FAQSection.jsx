import { useState } from "react";

// FAQ data
const faqs = [
  {
    question: "How do I book an event ticket?",
    answer: "Simply click on an event, choose your ticket type, and complete the payment process securely."
  },
  {
    question: "Can I get a refund for my ticket?",
    answer: "Refunds depend on the event organizer's policy. Check the event details before purchase."
  },
  {
    question: "How do I become an event organizer?",
    answer: "Register on our platform and submit your event details. Our team will review and approve your event."
  },
  {
    question: "Is my payment safe?",
    answer: "Yes! We support secure payment methods like M-Pesa, PayPal, and credit cards."
  }
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md mb-4 p-4 cursor-pointer transition-all hover:shadow-lg">
      <div onClick={() => setOpen(!open)} className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{question}</h3>
        <span className="text-2xl">{open ? "âˆ’" : "+"}</span>
      </div>
      {open && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}
