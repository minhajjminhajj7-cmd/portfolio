function Hero() {
  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-8 min-h-[80vh] flex items-center"
    >

      <div className="max-w-3xl">

        <p className="text-gray-400 text-lg mb-4">
          Hello, I'm
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Minhajj Minhajj
        </h1>

        <h2 className="text-2xl md:text-3xl text-gray-400 mt-4">
          Computer Science Student & Full-Stack Developer
        </h2>

        <p className="text-gray-500 text-lg mt-6 max-w-2xl leading-relaxed">
          I build modern web applications and solve real-world
          problems using technology, clean code, and creative thinking.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <a
            href="#projects"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200 transition"
          >
            View My Projects
          </a>

          <a
            href="#contact"
            className="rounded-lg border border-gray-700 px-6 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Contact Me
          </a>

        </div>

      </div>

    </section>
  )
}

export default Hero