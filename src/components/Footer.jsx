function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-10">

      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-gray-500 text-sm">
          © 2026 Minhajj. All rights reserved.
        </p>

        <div className="flex gap-6">

          <a
            href="#home"
            className="text-gray-500 hover:text-white transition"
          >
            Home
          </a>

          <a
            href="#projects"
            className="text-gray-500 hover:text-white transition"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="text-gray-500 hover:text-white transition"
          >
            Contact
          </a>

        </div>

      </div>

    </footer>
  )
}

export default Footer