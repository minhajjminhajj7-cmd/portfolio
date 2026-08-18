import { useEffect, useState } from "react";

function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("http://localhost:5001/api/hero")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch hero");
        }

        return response.json();
      })
      .then((data) => {
        setHero(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hero error:", error);
        setHero(null);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 20,
        y: (event.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (loading) {
    return (
      <section
        id="home"
        className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gray-950"
      >
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />

          <p className="text-sm tracking-[0.3em] uppercase text-gray-500">
            Initializing...
          </p>
        </div>
      </section>
    );
  }

  if (!hero) {
    return null;
  }

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gray-950 flex items-center"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main blue glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px] transition-transform duration-700"
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x}px), calc(-50% + ${mousePosition.y}px))`,
        }}
      />

      {/* Secondary glow */}
      <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />

      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Floating particles */}
      <div className="absolute left-[10%] top-[25%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse" />

      <div className="absolute right-[15%] top-[35%] h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse" />

      <div className="absolute left-[20%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse" />

      <div className="absolute right-[25%] bottom-[20%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div className="max-w-3xl">

            {/* Greeting */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)] animate-pulse" />

              <span className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase">
                {hero.greeting || "Welcome to my portfolio"}
              </span>
            </div>

            {/* Name */}
            {hero.name && (
              <h1 className="animate-[fadeInUp_0.8s_ease-out] text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                {hero.name}
                <span className="text-blue-500">.</span>
              </h1>
            )}

            {/* Title */}
            {hero.title && (
              <h2 className="mt-6 max-w-2xl text-2xl font-semibold leading-tight text-gray-300 sm:text-3xl md:text-4xl">
                {hero.title}
              </h2>
            )}

            {/* Description */}
            {hero.description && (
              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
                {hero.description}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">

              {hero.projects_button_text && (
                <a
                  href="#projects"
                  className="group relative overflow-hidden rounded-full bg-white px-7 py-3.5 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
                >
                  <span className="relative z-10">
                    {hero.projects_button_text}
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-blue-500 transition-transform duration-500 group-hover:translate-x-0" />
                </a>
              )}

              {hero.contact_button_text && (
                <a
                  href="#contact"
                  className="group rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  {hero.contact_button_text}
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              )}

            </div>

            {/* Mini tech line */}
            <div className="mt-12 flex flex-wrap items-center gap-5 text-xs tracking-widest text-gray-600 uppercase">
              <span>Software Development</span>
              <span className="h-1 w-1 rounded-full bg-blue-500" />
              <span>IoT</span>
              <span className="h-1 w-1 rounded-full bg-blue-500" />
              <span>Problem Solving</span>
            </div>

          </div>

          {/* Right visual */}
          <div className="relative hidden h-[500px] items-center justify-center lg:flex">

            {/* Outer rings */}
            <div className="absolute h-[380px] w-[380px] rounded-full border border-blue-500/10 animate-[spin_20s_linear_infinite]" />

            <div className="absolute h-[300px] w-[300px] rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Glow */}
            <div className="absolute h-64 w-64 rounded-full bg-blue-500/20 blur-[90px]" />

            {/* Center */}
            <div
              className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-gray-900/70 shadow-[0_0_80px_rgba(59,130,246,0.2)] backdrop-blur-xl transition-transform duration-500"
              style={{
                transform: `translate(${mousePosition.x * 0.35}px, ${mousePosition.y * 0.35}px)`,
              }}
            >
              <div className="absolute inset-5 rounded-full border border-blue-500/20" />

              <div className="text-center">
                <div className="text-6xl">{"</>"}</div>

                <p className="mt-4 text-xs tracking-[0.3em] text-blue-400 uppercase">
                  Build
                </p>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute left-4 top-20 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl shadow-xl animate-[float_4s_ease-in-out_infinite]">
              <p className="text-xs text-gray-500">Focus</p>
              <p className="mt-1 font-semibold text-white">
                Software
              </p>
            </div>

            <div className="absolute bottom-20 right-0 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl shadow-xl animate-[float_5s_ease-in-out_infinite]">
              <p className="text-xs text-gray-500">Exploring</p>
              <p className="mt-1 font-semibold text-blue-400">
                IoT
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-gray-600 transition-colors hover:text-white md:flex"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </span>

        <span className="h-10 w-6 rounded-full border border-white/10 p-1">
          <span className="block h-2 w-2 rounded-full bg-blue-500 animate-bounce mx-auto" />
        </span>
      </a>
    </section>
  );
}

export default Hero;
