function Skills() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-8 py-24">

      <p className="text-gray-500 uppercase tracking-widest text-sm">
        My Skills
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mt-3">
        Technologies I Work With
      </h2>

      <p className="text-gray-400 text-lg mt-4 max-w-2xl">
        I use different technologies to build modern and useful
        software applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        <div className="border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Frontend
          </h3>

          <div className="flex flex-wrap gap-3">
            <span className="border border-gray-800 rounded-lg px-4 py-2">
              HTML
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              CSS
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              JavaScript
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              React
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              Tailwind CSS
            </span>
          </div>
        </div>


        <div className="border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Backend
          </h3>

          <div className="flex flex-wrap gap-3">
            <span className="border border-gray-800 rounded-lg px-4 py-2">
              Java
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              Spring Boot
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              PHP
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              REST API
            </span>
          </div>
        </div>


        <div className="border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Database
          </h3>

          <div className="flex flex-wrap gap-3">
            <span className="border border-gray-800 rounded-lg px-4 py-2">
              MySQL
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              SQL
            </span>
          </div>
        </div>


        <div className="border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Tools
          </h3>

          <div className="flex flex-wrap gap-3">
            <span className="border border-gray-800 rounded-lg px-4 py-2">
              Git
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              GitHub
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              VS Code
            </span>

            <span className="border border-gray-800 rounded-lg px-4 py-2">
              Linux
            </span>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Skills