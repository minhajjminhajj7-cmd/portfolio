import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH PROJECTS FROM BACKEND
  // =========================================================

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
      console.error(
        "Error fetching projects:",
        error
      );

      setError(
        "Unable to load projects. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD PROJECTS WHEN COMPONENT MOUNTS
  // =========================================================

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <section
        id="projects"
        className="py-20 bg-gray-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            My Projects
          </h2>

          <div className="flex justify-center">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>

              <p className="text-gray-400">
                Loading projects...
              </p>

            </div>

          </div>

        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error) {
    return (
      <section
        id="projects"
        className="py-20 bg-gray-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            My Projects
          </h2>

          <div className="max-w-xl mx-auto text-center bg-red-500/10 border border-red-500 rounded-xl p-8">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <p className="text-red-400 mb-5">
              {error}
            </p>

            <button
              onClick={fetchProjects}
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
  // EMPTY STATE
  // =========================================================

  if (projects.length === 0) {
    return (
      <section
        id="projects"
        className="py-20 bg-gray-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            My Projects
          </h2>

          <div className="text-center bg-gray-800 rounded-xl p-10">

            <div className="text-5xl mb-4">
              📂
            </div>

            <p className="text-gray-400">
              No projects available yet.
            </p>

          </div>

        </div>
      </section>
    );
  }

  // =========================================================
  // PROJECTS
  // =========================================================

  return (
    <section
      id="projects"
      className="py-20 bg-gray-900 text-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* SECTION TITLE */}

        <div className="text-center mb-12">

          <p className="text-blue-400 font-medium mb-2">
            MY WORK
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            My Projects
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are some of the projects I have built
            using modern technologies and development
            tools.
          </p>

        </div>

        {/* PROJECT GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (

            <article
              key={project.id}
              className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 hover:-translate-y-2 transition duration-300 shadow-lg"
            >

              {/* =================================================
                  PROJECT IMAGE
              ================================================== */}

              {project.image_url ? (

                <div className="relative">

                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition" />

                </div>

              ) : (

                <div className="w-full h-52 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">

                  <div className="text-center">

                    <div className="text-5xl mb-2">
                      💻
                    </div>

                    <p className="text-gray-400">
                      Project
                    </p>

                  </div>

                </div>

              )}

              {/* =================================================
                  PROJECT CONTENT
              ================================================== */}

              <div className="p-6">

                {/* TITLE */}

                <h3 className="text-2xl font-semibold mb-3">
                  {project.title}
                </h3>

                {/* DESCRIPTION */}

                <p className="text-gray-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* TECHNOLOGIES */}

                {project.technologies && (

                  <div className="mb-6">

                    <p className="text-sm text-gray-400 mb-3">
                      Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {project.technologies
                        .split(",")
                        .map(
                          (technology, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-blue-300 text-xs px-3 py-1 rounded-full"
                            >
                              {technology.trim()}
                            </span>
                          )
                        )}

                    </div>

                  </div>

                )}

                {/* =================================================
                    BUTTONS
                ================================================== */}

                <div className="flex flex-wrap gap-3">

                  {project.github_url && (

                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition font-medium"
                    >
                      GitHub ↗
                    </a>

                  )}

                  {project.live_url && (

                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition font-medium"
                    >
                      Live Demo ↗
                    </a>

                  )}

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Projects;