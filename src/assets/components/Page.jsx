import { FaSnapchat, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ng44zk3";
const TEMPLATE_ID = "template_wcbpr5c";
const AUTOREPLY_TEMPLATE_ID = "template_6ce82ku";
const PUBLIC_KEY = "LlsDzZmobiJ5An_0W";

export default function Contact({ darkMode, selectedService }) {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");
  const [homeService, setHomeService] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hairstyle: "",
    date: "",
    time: "",
    message: "",
    address: "",
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        hairstyle: `${selectedService.name} — ${selectedService.price}`,
      }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTimeSlots = () => {
    const day = new Date(formData.date).getDay();
    const isWeekend = day === 0 || day === 6;

    return isWeekend
      ? ["12:00 PM – 2:00 PM", "2:00 PM – 4:00 PM", "4:00 PM – 6:00 PM"]
      : ["10:00 AM – 12:00 PM", "12:00 PM – 2:00 PM", "2:00 PM – 4:00 PM", "4:00 PM – 6:00 PM"];
  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.hairstyle.trim() !== "" &&
    formData.date !== "" &&
    formData.time !== "" &&
    (!homeService || formData.address.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setStatus("sending");

    // Send notification to owner
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        hairstyle: formData.hairstyle,
        date: formData.date,
        time: formData.time,
        message: formData.message,
        address: homeService ? formData.address : "Not requested",
      },
      PUBLIC_KEY
    )
    .then(() => {
      // Send auto-reply to customer
      return emailjs.send(
        SERVICE_ID,
        AUTOREPLY_TEMPLATE_ID,
        {
          firstName: formData.firstName,
          email: formData.email,
          hairstyle: formData.hairstyle,
          date: formData.date,
          time: formData.time,
          address: homeService ? formData.address : "Not requested",
        },
        PUBLIC_KEY
      );
    })
    .then(() => {
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        hairstyle: "",
        date: "",
        time: "",
        message: "",
        address: "",
      });
      setHomeService(false);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      setStatus("error");
    });
  };

  const socials = [
    {
      icon: <FaSnapchat size={20} />,
      label: "Snapchat",
      handle: "Braids 'n' More",
      href: "https://www.snapchat.com/add/braidsnmore",
    },
    {
      icon: <FaInstagram size={20} />,
      label: "Instagram",
      handle: "Braids 'n' More",
      href: "https://www.instagram.com/braidsnmore",
    },
    {
      icon: <FaFacebook size={20} />,
      label: "Facebook",
      handle: "Braids 'n' More",
      href: "https://www.facebook.com/braidsnmore",
    },
    {
      icon: <FaWhatsapp size={20} />,
      label: "Whatsapp",
      handle: "Braids 'n' More",
      href: "https://wa.me/2340000000000",
    },
  ];

  const inputClass = `px-4 py-3 rounded-lg border text-sm outline-none focus:border-pink-500 transition-colors duration-300 ${
    darkMode
      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
      : "bg-gray-50 border-gray-300 text-black placeholder-gray-400"
  }`;

  return (
    <section
      id="contact"
      className={`w-full transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-gray-50 text-black"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left side */}
        <div className="flex flex-col justify-center gap-8">
          <div>
            <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-3">
              Get In Touch
            </p>
            <h2 className="text-5xl font-serif font-bold leading-tight">
              Ready for a{" "}
              <span className="text-pink-500 italic">Perfect</span>{" "}
              Hair Experience?
            </h2>
          </div>

          <p className={`text-base leading-relaxed max-w-md ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Schedule your personalized hair care experience with our specialists.
            We'll bring luxury, creativity, and expert care directly to your space.
          </p>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-300 group-hover:border-pink-500 group-hover:text-pink-400 ${
                  darkMode
                    ? "border-gray-700 text-pink-400 bg-gray-900"
                    : "border-gray-300 text-pink-500 bg-white"
                }`}>
                  {social.icon}
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {social.label}
                  </p>
                  <p className="text-sm font-semibold group-hover:text-pink-500 transition-colors duration-200">
                    {social.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right side - Form */}
        <div className={`rounded-2xl p-8 shadow-xl transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
          <h3 className="text-2xl font-bold mb-6">Book Appointment</h3>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* First and Last name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  First Name <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Last Name <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Email <span className="text-pink-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Contact Number <span className="text-pink-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+234 000 0000 000"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Hairstyle */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Hairstyle <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                name="hairstyle"
                placeholder="Select from Services above or type your preferred style"
                value={formData.hairstyle}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Click any hairstyle card above to auto-fill this, or type manually.
              </p>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Preferred Date <span className="text-pink-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value, time: "" });
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Preferred Time <span className="text-pink-500">*</span>
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  disabled={!formData.date}
                  className={`${inputClass} ${!formData.date ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <option value="">
                    {formData.date ? "Select a time" : "Pick a date first"}
                  </option>
                  {getTimeSlots().map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Home Service Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Home Service
                </p>
                <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Want us to come to you?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setHomeService(!homeService)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                  homeService ? "bg-pink-500" : darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                    homeService ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Address - shows when home service is on */}
            {homeService && (
              <div className="flex flex-col gap-1">
                <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Address <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                  required={homeService}
                  className={inputClass}
                />
              </div>
            )}

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Message <span className={darkMode ? "text-gray-500" : "text-gray-400"}>(optional)</span>
              </label>
              <textarea
                name="message"
                placeholder="Tell us about the service you want..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending" || !isFormValid}
              className={`w-full py-4 rounded-full text-white font-semibold text-base transition-all duration-300 mt-2 ${
                isFormValid
                  ? "bg-pink-500 hover:bg-pink-600 cursor-pointer"
                  : "bg-pink-300 cursor-not-allowed opacity-50"
              }`}
            >
              {status === "sending" ? "Sending..." : "Book Appointment →"}
            </button>

            {status === "success" && (
              <p className="text-green-500 text-center font-medium">
                ✅ Booking sent! We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center font-medium">
                ❌ Something went wrong. Please try again.
              </p>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}