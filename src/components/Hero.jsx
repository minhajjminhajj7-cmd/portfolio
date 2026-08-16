import { useEffect, useState } from "react";

function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/hero")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch hero");
        }

        return response.json();
      })
      .then((data) => {
        setHero(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hero error:", error);
        setHero(null);
        setLoading(false);
      });
  }, []);

  // Don't display anything if there is no hero in MySQL
  if (loading) {
    return (
      <section
        id="home"
        className="max-w-7xl mx-auto px-8 min-h-[80vh] flex items-center"
      >
        <p className="text-gray-500">
          Loading...
        </p>
      </section>
    );
  }

  if (!hero) {
    return null;
  }

  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-8 min-h-[80vh] flex items-center"
    >
      <div className="max-w-3xl">

        {hero.greeting && (
          <p className="text-gray-400 text-lg mb-4">
            {hero.greeting}
          </p>
        )}

        {hero.name && (
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {hero.name}
          </h1>
        )}

        {hero.title && (
          <h2 className="text-2xl md:text-3xl text-gray-400 mt-4">
            {hero.title}
          </h2>
        )}

        {hero.description && (
          <p className="text-gray-500 text-lg mt-6 max-w-2xl leading-relaxed">
            {hero.description}
          </p>
        )}

        <div className="flex flex-wrap gap-4 mt-8">

          {hero.projects_button_text && (
            <a
              href="#projects"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
            >
              {hero.projects_button_text}
            </a>
          )}

          {hero.contact_button_text && (
            <a
              href="#contact"
              className="rounded-lg border border-gray-700 px-6 py-3 font-semibold hover:bg-gray-800 transition"
            >
              {hero.contact_button_text}
            </a>
          )}

        </div>

      </div>
    </section>
  );
}

export default Hero;
