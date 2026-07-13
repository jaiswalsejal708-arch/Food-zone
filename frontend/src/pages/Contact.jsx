import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

// The Contact page.
// Has a contact form and a map placeholder.
function Contact() {
  // State for the form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent!\nName: ${name}\nEmail: ${email}`);
    // Clear the form after sending
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      {/* Banner */}
      <div className="bg-primary py-12 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Get in Touch
          </h1>
          <p className="mt-2 text-xs text-white/80">
            We'd love to hear from you. Send us a message!
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact form */}
          <div className="rounded-xl bg-white p-8 shadow-soft border border-gray-100">
            <h2 className="text-base font-bold text-text mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-text">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-text">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-text">
                  Message
                </label>
                <textarea
                  required
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="input-field resize-none"
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c42f3b]"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact info + map placeholder */}
          <div className="space-y-6">
            {/* Contact details */}
            <div className="rounded-xl bg-white p-8 shadow-soft border border-gray-100">
              <h2 className="text-base font-bold text-text mb-4">Contact Details</h2>
              <ul className="space-y-4 text-xs text-gray-600">
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary text-base shrink-0" />
                  Connaught Place, New Delhi, India
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-primary text-base shrink-0" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-primary text-base shrink-0" />
                  hello@foodie.com
                </li>
              </ul>
            </div>

            {/* Google Map placeholder */}
            <div className="overflow-hidden rounded-xl shadow-soft border border-gray-100">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Connaught+Place+New+Delhi&output=embed"
                className="h-72 w-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
