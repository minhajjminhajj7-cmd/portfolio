function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold tracking-tight"
        >
          Minhajj<span className="text-gray-500">.</span>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="#home"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            About
          </a>

          <a
            href="#skills"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Contact
          </a>

        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition duration-300"
        >
          Let's Talk
        </a>

      </div>
    </nav>
  )
}

export default Navbar