import Image from "next/image";
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRobot,
} from "react-icons/fa";

const QUICK_FACTS = [
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Beirut, Lebanon" },
  {
    icon: <FaBriefcase />,
    label: "Role",
    value: "Laravel Full-Stack Developer",
  },
  {
    icon: <FaGraduationCap />,
    label: "Education",
    value: "BS Computer Science, LIU",
  },
  { icon: <FaRobot />, label: "Focus", value: "AI-Powered Systems" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-32 px-4 overflow-hidden"
    >
      <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(84,131,179,0.10),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ice mb-3">
            Get To Know Me
          </p>
          <h2 className="heading-fluid font-black">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="px-2">
          {/* Bio Card */}
          <div className="modern-card p-5 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr]">
              {/* Photo */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-[1.75rem] bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-70" />
                  <div className="relative h-44 w-44 overflow-hidden rounded-3xl sm:h-56 sm:w-56 lg:h-72 lg:w-72 ring-2 ring-white/10">
                    <Image
                      src="/images/me.png"
                      alt="Abbas Fares"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/3 px-3.5 py-1.5 text-xs font-semibold text-white">
                  <span className="relative inline-flex w-2 h-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
                  </span>
                  Available for opportunities
                </div>
                <h3 className="mb-4 text-lg sm:text-3xl font-bold text-white">
                  Laravel-focused Full-Stack Developer
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-lg">
                  Laravel-focused Full-Stack Developer with hands-on experience
                  building secure, API-driven web applications, AI-powered
                  systems, and backend services for real business needs. Skilled
                  in PHP, Laravel, Vue.js, JavaScript, Python, React, and
                  Next.js, with practical experience in MySQL, REST APIs,
                  Docker, AI agents, and cloud hosting. Focused on building
                  reliable, user-friendly applications that solve real problems
                  and deliver clear, consistent value to users, clients, and
                  teams.
                </p>

                {/* Quick Facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUICK_FACTS.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400">
                        {fact.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-wide text-gray-500">
                          {fact.label}
                        </span>
                        <span className="block text-sm font-semibold text-white truncate">
                          {fact.value}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
