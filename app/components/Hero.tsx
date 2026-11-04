const ROLES = ["Laravel Full-Stack Developer", "PHP | REST APIs | Vue.js"];
const TECH_STACK = [
  "Laravel",
  "Vue",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AI/ML",
];
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main heading with gradient */}
        <h1 className="hero-heading-fluid font-black mb-8 leading-tight">
          <span className="block text-white mb-2">Hi, I&apos;m</span>
          <span className="block text-gradient">Abbas Fares</span>
        </h1>

        {/* Roles — static. This was a typewriter driven by a perpetual
            setTimeout chain, re-laying-out and repainting text every 50-100ms
            for the life of the tab, plus an infinite pulsing caret. */}
        <div className="mb-8 flex flex-col items-center justify-center gap-1">
          {ROLES.map((role) => (
            <p
              key={role}
              className="text-lg sm:text-2xl md:text-4xl font-bold text-white"
            >
              {role}
            </p>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Building secure, API-driven web applications and AI-powered systems
          with Laravel, React, and modern tooling.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 justify-center flex-wrap mt-5 mb-12">
          <a
            href="#projects"
            className="group relative px-4 py-1.5 sm:px-6 sm:py-2 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl text-white font-bold text-sm sm:text-lg"
          >
            <span className="relative z-10">View My Work</span>
            <svg
              className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          <a
            href="/Abbas-Fares-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-xl sm:rounded-2xl text-white font-bold text-sm sm:text-lg"
          >
            <svg
              className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download CV
          </a>

          <a
            href="#contact"
            className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-xl sm:rounded-2xl text-white font-bold text-sm sm:text-lg"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Tech stack — static row. This was a 16s infinite marquee rendering 64
          copies of the list inside a backdrop-filtered, CSS-masked container,
          so the compositor could not fast-path it and re-rasterized that
          blurred + masked strip every frame for the life of the tab. */}
      <div className="relative z-10 self-stretch -mx-4 mt-8 border-y border-white/5 bg-white/3 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium whitespace-nowrap text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
