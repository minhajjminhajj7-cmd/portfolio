import { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

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
      console.error("Error fetching skills:", error);
      setError("Unable to load skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const section = document.getElementById("skills");

    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  if (loading) {
    return (
      <section
        id="skills"
        className="min-h-[60vh] bg-gray-950 py-28 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />

          <p className="mt-5 text-sm tracking-widest text-gray-500 uppercase">
            Loading Arsenal...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="skills"
        className="bg-gray-950 py-28 text-white"
      >
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10">
            <div className="mb-4 text-5xl">⚠️</div>

            <p className="text-red-400">{error}</p>

            <button
              onClick={fetchSkills}
              className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return (
      <section
        id="skills"
        className="bg-gray-950 py-28 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-blue-400">SKILLS</p>

          <h2 className="mt-3 text-5xl font-black">
            My Arsenal
          </h2>

          <p className="mt-6 text-gray-500">
            No skills have been added yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gray-950 py-28 md:py-36"
    >
      {/* Background glow */}

      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[130px]" />

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">

        {/* HEADER */}

        <div
          className={`mb-16 transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-blue-500" />

            <p className="text-xs font-semibold tracking-[0.3em] text-blue-400 uppercase">
              What I Work With
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">
                My <span className="text-blue-500">Arsenal.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
                Technologies and tools I use to transform ideas into
                practical digital solutions.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-md md:block">
              <p className="text-xs text-gray-600 uppercase">
                Technologies
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {skills.length}
              </p>
            </div>

          </div>
        </div>

        {/* SKILLS GRID */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {skills.map((skill, index) => {
            const proficiency = Math.min(
              Math.max(Number(skill.proficiency) || 0, 0),
              100
            );

            return (
              <div
                key={skill.id}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_rgba(59,130,246,0.08)] ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >

                {/* Hover glow */}

                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Top */}

                <div className="relative z-10 flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-lg font-bold text-blue-400 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:scale-110">
                      {skill.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {skill.name}
                      </h3>

                      {skill.category && (
                        <p className="mt-1 text-xs text-gray-600">
                          {skill.category}
                        </p>
                      )}
                    </div>

                  </div>

                  <span className="text-sm font-bold text-blue-400">
                    {proficiency}%
                  </span>

                </div>

                {/* Progress */}

                <div className="relative z-10 mt-7">

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 transition-all duration-[1500ms] ease-out"
                      style={{
                        width: visible ? `${proficiency}%` : "0%",
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    />

                  </div>

                  <div className="mt-3 flex justify-between text-[10px] tracking-wider text-gray-600 uppercase">
                    <span>Learning</span>
                    <span>Proficiency</span>
                  </div>

                </div>

                {/* Bottom line */}

                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/5 pt-4">

                  <span className="text-xs text-gray-600">
                    Skill #{String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-xs text-blue-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Active →
                  </span>

                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom statement */}

        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-sm tracking-widest text-gray-600 uppercase">
            Learn • Build • Improve • Repeat
          </p>
        </div>

      </div>
    </section>
  );
}

export default Skills;
