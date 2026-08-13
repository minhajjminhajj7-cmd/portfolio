function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

      <h1 className="text-2xl font-bold">
        Minhajj<span className="text-gray-500">.</span>
      </h1>

      <div className="hidden md:flex items-center gap-8">

        <a
          href="#home"
          className="text-gray-300 hover:text-white transition"
        >
          Home
        </a>

        <a
          href="#about"
          className="text-gray-300 hover:text-white transition"
        >
          About
        </a>

        <a
          href="#skills"
          className="text-gray-300 hover:text-white transition"
        >
          Skills
        </a>

        <a
          href="#projects"
          className="text-gray-300 hover:text-white transition"
        >
          Projects
        </a>

        <a
          href="#contact"
          className="text-gray-300 hover:text-white transition"
        >
          Contact
        </a>

      </div>

      <a
        href="#contact"
        className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition"
      >
        Let's Talk
      </a>

    </nav>
  )
}

export default Navbar