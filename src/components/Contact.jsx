import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // HANDLE INPUT CHANGES
  // =========================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove old status when user starts typing again
    if (status) {
      setStatus("");
      setStatusType("");
    }
  };

  // =========================================================
  // HANDLE FORM SUBMISSION
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus("Please fill in all fields.");
      setStatusType("error");
      return;
    }

    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message"
        );
      }

      // SUCCESS
      setStatus(
        "Message sent successfully! Thank you for contacting me. 🚀"
      );

      setStatusType("success");

      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Error sending message:",
        error
      );

      setStatus(
        "Failed to send message. Please try again."
      );

      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gray-900 text-white"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold mb-4">
            Contact Me
          </h2>

          <p className="text-gray-400">
            Have a project, opportunity, or question?
            Send me a message.
          </p>

        </div>

        {/* ===================================================
            CONTACT FORM
        ==================================================== */}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700"
        >

          {/* NAME */}

          <div className="mb-6">

            <label
              htmlFor="name"
              className="block mb-2 font-medium"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />

          </div>

          {/* EMAIL */}

          <div className="mb-6">

            <label
              htmlFor="email"
              className="block mb-2 font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />

          </div>

          {/* MESSAGE */}

          <div className="mb-6">

            <label
              htmlFor="message"
              className="block mb-2 font-medium"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
            />

          </div>

          {/* STATUS */}

          {status && (
            <div
              className={`mb-6 p-4 rounded-lg text-center ${
                statusType === "success"
                  ? "bg-green-500/10 border border-green-500 text-green-400"
                  : "bg-red-500/10 border border-red-500 text-red-400"
              }`}
            >
              {status}
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Sending..."
              : "Send Message 🚀"}
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;