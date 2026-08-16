import { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH SKILLS
  // =========================================================

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/api/skills"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }

      const data = await response.json();

      setSkills(data);
    } catch (error) {
      console.error(
        "Error fetching skills:",
        error
      );

      setError(
        "Unable to load skills. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD SKILLS WHEN COMPONENT MOUNTS
  // =========================================================

  useEffect(() => {
    fetchSkills();
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <section
        id="skills"
        className="py-20 bg-gray-950 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-blue-400 font-medium mb-2">
              WHAT I KNOW
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              My Skills
            </h2>

          </div>

          <div className="flex justify-center">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>

              <p className="text-gray-400">
                Loading skills...
              </p>

            </div>

          </div>

        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <section
        id="skills"
        className="py-20 bg-gray-950 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-blue-400 font-medium mb-2">
              WHAT I KNOW
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              My Skills
            </h2>

          </div>

          <div className="max-w-xl mx-auto text-center bg-red-500/10 border border-red-500 rounded-xl p-8">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <p className="text-red-400 mb-5">
              {error}
            </p>

            <button
              onClick={fetchSkills}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
            >
              Try Again
            </button>

          </div>

        </div>
      </section>
    );
  }

  // =========================================================
  // EMPTY
  // =========================================================

  if (skills.length === 0) {
    return (
      <section
        id="skills"
        className="py-20 bg-gray-950 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-blue-400 font-medium mb-2">
              WHAT I KNOW
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              My Skills
            </h2>

          </div>

          <div className="text-center bg-gray-800 rounded-xl p-10">

            <div className="text-5xl mb-4">
              🛠️
            </div>

            <p className="text-gray-400">
              No skills available yet.
            </p>

          </div>

        </div>
      </section>
    );
  }

  // =========================================================
  // SKILLS
  // =========================================================

  return (
    <section
      id="skills"
      className="py-20 bg-gray-950 text-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="text-center mb-12">

          <p className="text-blue-400 font-medium mb-2">
            WHAT I KNOW
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            My Skills
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I use to build modern,
            reliable, and scalable applications.
          </p>

        </div>

        {/* ===================================================
            SKILL GRID
        ==================================================== */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {skills.map((skill) => {

            const proficiency = Math.min(
              Math.max(Number(skill.proficiency) || 0, 0),
              100
            );

            return (
              <div
                key={skill.id}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-1 transition duration-300 shadow-lg"
              >

                {/* SKILL HEADER */}

                <div className="flex justify-between items-center mb-3">

                  <div>

                    <h3 className="text-xl font-semibold">
                      {skill.name}
                    </h3>

                    {skill.category && (
                      <p className="text-sm text-gray-400 mt-1">
                        {skill.category}
                      </p>
                    )}

                  </div>

                  <span className="text-blue-400 font-bold text-lg">
                    {proficiency}%
                  </span>

                </div>

                {/* PROGRESS BAR */}

                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">

                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${proficiency}%`,
                    }}
                  />

                </div>

                {/* PROFICIENCY LABEL */}

                <div className="flex justify-between text-xs text-gray-500 mt-2">

                  <span>
                    Beginner
                  </span>

                  <span>
                    Expert
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Skills;