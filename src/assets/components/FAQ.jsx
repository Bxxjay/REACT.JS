import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our website by filling out the booking form on the Contact page, or by reaching out to us directly via WhatsApp or Instagram.",
  },
  {
    id: 2,
    question: "What hair services do you offer?",
    answer: "We offer a wide range of services including haircuts, braiding, weaves, hair treatments, colouring, styling, and more. Check our Services page for the full list.",
  },
  {
    id: 3,
    question: "How long does a typical appointment take?",
    answer: "It depends on the service. A simple trim can take 30 minutes while braiding or weaves can take 2–4 hours. We'll give you an estimated time when you book.",
  },
  {
    id: 4,
    question: "Do you offer home service?",
    answer: "Yes! We offer at-home hair services. Just select the home service option when booking and provide your location details.",
  },
  {
    id: 5,
    question: "What products do you use?",
    answer: "We use only premium, hair-friendly products that are safe for all hair types. We can also work with your own products if you prefer.",
  },
  {
    id: 6,
    question: "Can I cancel or reschedule my appointment?",
    answer: "Yes, you can cancel or reschedule up to 24 hours before your appointment. Please contact us via WhatsApp or Instagram to make changes.",
  },
];

function FAQItem({ faq, isOpen, onToggle, darkMode }) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-pink-500 shadow-md shadow-pink-500/20"
          : darkMode
          ? "border-gray-800 hover:border-pink-400"
          : "border-gray-200 hover:border-pink-400"
      }`}
    >
      {/* Question */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-300 ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <span className={`font-semibold text-base ${isOpen ? "text-pink-500" : ""}`}>
          {faq.question}
        </span>
        <span
          className={`text-xl font-bold transition-transform duration-300 ${
            isOpen ? "rotate-45 text-pink-500" : darkMode ? "text-white" : "text-black"
          }`}
        >
          +
        </span>
      </button>

      {/* Answer */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p
          className={`px-6 pb-5 text-sm leading-relaxed ${
            darkMode ? "bg-black text-gray-400" : "bg-white text-gray-600"
          }`}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection({ darkMode }) {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      className={`w-full px-6 py-20 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-2">
            FAQ
          </p>
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          <p className={`mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Everything you need to know before booking with us.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              darkMode={darkMode}
            />
          ))}
        </div>

      </div>
    </section>
  );
}