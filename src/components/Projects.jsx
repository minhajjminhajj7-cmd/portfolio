function Projects() {
  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-8 py-24"
    >

      <div className="mb-12">

        <p className="text-gray-500 uppercase tracking-widest text-sm">
          My Work
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          Featured Projects
        </h2>

        <p className="text-gray-400 text-lg mt-4 max-w-2xl">
          Here are some of the projects I have worked on while
          learning and developing my software engineering skills.
        </p>

      </div>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


        {/* CampusBuddy */}
        <div className="border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition">

          <div className="h-48 bg-gray-900 flex items-center justify-center">
            <span className="text-gray-600 text-4xl font-bold">
              CB
            </span>
          </div>

          <div className="p-6">

            <h3 className="text-2xl font-semibold">
              CampusBuddy
            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed">
              A student-focused platform that helps students find
              campus information, timetables, contacts, events,
              and other important college resources.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                React
              </span>

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                Spring Boot
              </span>

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                MySQL
              </span>

            </div>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="text-sm font-semibold hover:text-gray-400"
              >
                GitHub →
              </a>

              <a
                href="#"
                className="text-sm font-semibold hover:text-gray-400"
              >
                Live Demo →
              </a>

            </div>

          </div>

        </div>


        {/* Car Rental */}
        <div className="border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition">

          <div className="h-48 bg-gray-900 flex items-center justify-center">
            <span className="text-gray-600 text-4xl font-bold">
              CR
            </span>
          </div>

          <div className="p-6">

            <h3 className="text-2xl font-semibold">
              Car Rental Management System
            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed">
              A full-stack car rental platform with authentication,
              car management, booking, search, payments, and
              administrative features.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                React
              </span>

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                Spring Boot
              </span>

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                MySQL
              </span>

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                JWT
              </span>

            </div>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="text-sm font-semibold hover:text-gray-400"
              >
                GitHub →
              </a>

              <a
                href="#"
                className="text-sm font-semibold hover:text-gray-400"
              >
                Live Demo →
              </a>

            </div>

          </div>

        </div>


        {/* Digital Diary */}
        <div className="border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition">

          <div className="h-48 bg-gray-900 flex items-center justify-center">
            <span className="text-gray-600 text-4xl font-bold">
              DD
            </span>
          </div>

          <div className="p-6">

            <h3 className="text-2xl font-semibold">
              Digital Diary
            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed">
              A digital diary application designed to help students
              organize, store, and manage their personal academic
              information digitally.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                Flutter
              </span>

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                Dart
              </span>

              <span className="text-sm px-3 py-1 bg-gray-900 rounded">
                Database
              </span>

            </div>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="text-sm font-semibold hover:text-gray-400"
              >
                GitHub →
              </a>

              <a
                href="#"
                className="text-sm font-semibold hover:text-gray-400"
              >
                Details →
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Projects