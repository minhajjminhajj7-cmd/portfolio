import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/api/projects"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Unable to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");

    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section
        id="projects"
        className="min-h-[60vh] bg-gray-950 py-28 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />

          <p className="mt-5 text-xs tracking-[0.3em] text-gray-600 uppercase">
            Loading Projects...
          </p>

        </div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <section
        id="projects"
        className="bg-gray-950 py-28 text-white"
      >
        <div className="mx-auto max-w-xl px-6 text-center">

          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10">

            <div className="mb-5 text-5xl">⚠️</div>

            <p className="text-red-400">
              {error}
            </p>

            <button
              onClick={fetchProjects}
              className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
            >
              Try Again
            </button>

          </div>

        </div>
      </section>
    );
  }

  /* =========================
     EMPTY
  ========================= */

  if (projects.length === 0) {
    return (
      <section
        id="projects"
        className="bg-gray-950 py-28 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 text-center">

          <p className="text-xs font-semibold tracking-[0.3em] text-blue-400 uppercase">
            My Work
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Selected Projects
          </h2>

          <p className="mt-6 text-gray-500">
            Projects will appear here once they are added.
          </p>

        </div>
      </section>
    );
  }

  /* =========================
     PROJECTS
  ========================= */

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gray-950 py-28 md:py-36"
    >

      {/* BACKGROUND GLOWS */}

      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">

        {/* =========================
            HEADER
        ========================= */}

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
              My Work
            </p>

          </div>

          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <h2 className="text-5xl font-black tracking-tight text-white md:text-6xl">
                Selected{" "}
                <span className="text-blue-500">
                  Projects.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
                A collection of applications and systems I have
                built while exploring software development,
                backend systems and modern technologies.
              </p>

            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-md md:block">

              <p className="text-xs text-gray-600 uppercase">
                Built
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {projects.length}
              </p>

            </div>

          </div>

        </div>

        {/* =========================
            PROJECT GRID
        ========================= */}

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project, index) => (

            <article
              key={project.id}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-700 hover:-translate-y-3 hover:border-blue-500/30 hover:shadow-[0_25px_80px_rgba(59,130,246,0.12)] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >

              {/* =========================
                  IMAGE
              ========================= */}

              <div className="relative h-56 overflow-hidden">

                {project.image_url ? (

                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                ) : (

                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950/40 to-gray-900">

                    <div className="text-center">

                      <div className="text-5xl transition duration-500 group-hover:scale-125">
                        {"</>"}
                      </div>

                      <p className="mt-3 text-xs tracking-widest text-gray-600 uppercase">
                        Project
                      </p>

                    </div>

                  </div>

                )}

                {/* IMAGE OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80" />

                {/* PROJECT NUMBER */}

                <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-xs font-bold text-white backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* HOVER VIEW */}

                <div className="absolute bottom-5 right-5 translate-y-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore →
                </div>

              </div>

              {/* =========================
                  CONTENT
              ========================= */}

              <div className="p-7">

                <h3 className="text-2xl font-bold text-white transition group-hover:text-blue-400">
                  {project.title}
                </h3>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-500">
                  {project.description}
                </p>

                {/* TECHNOLOGIES */}

                {project.technologies && (

                  <div className="mt-6 flex flex-wrap gap-2">

                    {project.technologies
                      .split(",")
                      .map((technology, techIndex) => (

                        <span
                          key={techIndex}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-gray-400 transition duration-300 group-hover:border-blue-500/20 group-hover:text-blue-300"
                        >
                          {technology.trim()}
                        </span>

                      ))}

                  </div>

                )}

                {/* DIVIDER */}

                <div className="my-6 h-px bg-white/5" />

                {/* LINKS */}

                <div className="flex items-center gap-3">

                  {project.github_url && (

                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    >
                      <span>GitHub</span>
                      <span>↗</span>
                    </a>

                  )}

                  {project.live_url && (

                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:bg-blue-500 hover:-translate-y-0.5"
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>

                  )}

                </div>

              </div>

            </article>

          ))}

        </div>

        {/* =========================
            BOTTOM STATEMENT
        ========================= */}

        <div
          className={`mt-20 text-center transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >

          <p className="text-sm tracking-[0.25em] text-gray-600 uppercase">
            Ideas → Code → Real Solutions
          </p>

        </div>

      </div>
    </section>
  );
}

export default Projects;
