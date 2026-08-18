import { useEffect, useState } from "react";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAbout = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/api/about"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch About Me");
      }

      const data = await response.json();

      setAbout(data);
    } catch (error) {
      console.error("About error:", error);

      setError("Unable to load About Me.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <section
        id="about"
        className="max-w-7xl mx-auto px-8 py-24"
      >
        <p className="text-gray-500">
          Loading About Me...
        </p>
      </section>
    );
  }

  // ================================
  // ERROR
  // ================================

  if (error) {
    return (
      <section
        id="about"
        className="max-w-7xl mx-auto px-8 py-24"
      >
        <div className="bg-red-500/10 border border-red-500 rounded-xl p-6">
          <p className="text-red-400">
            {error}
          </p>

          <button
            onClick={fetchAbout}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ================================
  // NO ABOUT DATA
  // ================================

  if (!about) {
    return (
      <section
        id="about"
        className="max-w-7xl mx-auto px-8 py-24"
      >
        <p className="text-gray-500">
          About Me content is not available yet.
        </p>
      </section>
    );
  }

  // ================================
  // ABOUT CONTENT
  // ================================

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-8 py-24"
    >
      <div className="max-w-3xl">

        <p className="text-gray-500 uppercase tracking-widest text-sm">
          About Me
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          {about.heading}
        </h2>

        {about.paragraph1 && (
          <p className="text-gray-400 text-lg leading-relaxed mt-6">
            {about.paragraph1}
          </p>
        )}

        {about.paragraph2 && (
          <p className="text-gray-400 text-lg leading-relaxed mt-4">
            {about.paragraph2}
          </p>
        )}

      </div>
    </section>
  );
}

export default About;
