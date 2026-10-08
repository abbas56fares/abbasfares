"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaRobot,
} from "react-icons/fa";
import { CV_DATA } from "./ChatBot";

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);


  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-32 px-4 overflow-hidden"
    >
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-steel/10 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ice mb-3">
            Get To Know Me
          </p>
          <h2 className="heading-fluid font-black">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="px-2">
          {/* Flip Card */}
          <div className="relative" style={{ perspective: "2000px" }}>
            <button
              onClick={() => setFlipped((f) => !f)}
              className={`absolute top-3 right-3 sm:top-6 sm:right-6 z-20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 text-white text-[10px] sm:text-xs md:text-sm font-bold shadow-lg ${
                flipped ? "" : "animate-breathe"
              }`}
            >
              {flipped ? "Back" : "Read More"}
            </button>

            <div
              className="relative transition-transform duration-700 motion-reduce:transition-none transform-3d"
              style={{
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Face: Bio Card */}
              <div className="modern-card pt-14 px-5 pb-6 sm:p-10 lg:p-12 backface-hidden [-webkit-backface-visibility:hidden]">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr]">
                  {/* Photo */}
                  <div
                    className="flex justify-center lg:justify-start"
                    style={{ perspective: "1000px" }}
                  >
                    <div ref={photoRef} className="relative">
                      <div className="absolute -inset-1.5 rounded-[1.75rem] bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-sm" />
                      <div className="relative h-44 w-44 overflow-hidden rounded-3xl sm:h-56 sm:w-56 lg:h-72 lg:w-72 ring-2 ring-white/10">
                        <Image
                          src="/images/pic.jpg"
                          alt="Abbas Fares"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div ref={bioRef}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/3 px-3.5 py-1.5 text-xs font-semibold text-white">
                      <span className="relative inline-flex w-2 h-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
                      </span>
                      Available for opportunities
                    </div>
                    <h3 className="mb-4 text-lg sm:text-3xl font-bold text-white">
                      Laravel-focused Full-Stack Developer
                    </h3>
                    <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-lg">
                      Laravel-focused Full-Stack Developer with hands-on
                      experience building secure, API-driven web applications,
                      AI-powered systems, and backend services for real business
                      needs. Skilled in PHP, Laravel, Vue.js, JavaScript,
                      Python, React, and Next.js, with practical experience in
                      MySQL, REST APIs, Docker, AI agents, and cloud hosting.
                      Focused on building reliable, user-friendly applications
                      that solve real problems and deliver clear, consistent
                      value to users, clients, and teams.
                    </p>

                    {/* Quick Facts */}
                    <div
                      ref={factsRef}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
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

              {/* Back Face: CV */}
              <div className="modern-card pt-14 px-5 pb-6 sm:p-10 absolute inset-0 overflow-y-auto no-scrollbar backface-hidden [-webkit-backface-visibility:hidden] transform-[rotateY(180deg)]">
                <div className="space-y-2.5 sm:space-y-5 text-left">
                  <div>
                    <h3 className="text-lg sm:text-3xl font-bold text-white">
                      {CV_DATA.name}
                    </h3>
                    <p className="text-indigo-400 text-[11px] sm:text-sm font-semibold mt-0.5 sm:mt-1">
                      Laravel Full-Stack Developer
                    </p>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-1 sm:mt-2">
                      {CV_DATA.email} · {CV_DATA.phone} · {CV_DATA.address}
                    </p>
                  </div>

                  <p className="text-gray-400 text-[11px] sm:text-sm leading-snug sm:leading-relaxed">
                    {CV_DATA.profile}
                  </p>

                  <div>
                    <h4 className="text-indigo-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">
                      Experience
                    </h4>
                    <p className="text-white text-[11px] sm:text-sm font-semibold">
                      {CV_DATA.experience.title} · {CV_DATA.experience.company}
                    </p>
                    <p className="text-gray-500 text-[10px] sm:text-xs mb-1 sm:mb-2">
                      {CV_DATA.experience.duration}
                    </p>
                    <ul className="space-y-0.5 sm:space-y-1">
                      {CV_DATA.experience.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="text-gray-400 text-[10px] sm:text-xs leading-snug sm:leading-relaxed flex gap-2"
                        >
                          <span className="text-indigo-400 shrink-0">▹</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-indigo-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">
                      Education
                    </h4>
                    <p className="text-white text-[11px] sm:text-sm font-semibold">
                      {CV_DATA.education.degree}
                    </p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">
                      {CV_DATA.education.institution} ·{" "}
                      {CV_DATA.education.duration}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-indigo-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">
                      Certifications
                    </h4>
                    <ul className="space-y-0.5 sm:space-y-1">
                      {CV_DATA.certifications.map((c) => (
                        <li key={c} className="text-gray-400 text-[10px] sm:text-xs">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-indigo-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">
                      Skills
                    </h4>
                    <p className="text-gray-400 text-[10px] sm:text-xs leading-snug sm:leading-relaxed">
                      <span className="text-gray-300 font-semibold">
                        Programming:{" "}
                      </span>
                      {CV_DATA.skills.programming.join(", ")}
                      <br />
                      <span className="text-gray-300 font-semibold">
                        Frontend:{" "}
                      </span>
                      {CV_DATA.skills.frontend.join(", ")}
                      <br />
                      <span className="text-gray-300 font-semibold">
                        Backend:{" "}
                      </span>
                      {CV_DATA.skills.backend.join(", ")}
                      <br />
                      <span className="text-gray-300 font-semibold">
                        Databases:{" "}
                      </span>
                      {CV_DATA.skills.database.join(", ")}
                      <br />
                      <span className="text-gray-300 font-semibold">
                        AI & ML:{" "}
                      </span>
                      {CV_DATA.skills.ai.join(", ")}
                      <br />
                      <span className="text-gray-300 font-semibold">
                        Tools:{" "}
                      </span>
                      {CV_DATA.skills.tools.join(", ")}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-indigo-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2">
                      Languages
                    </h4>
                    <p className="text-gray-400 text-[10px] sm:text-xs">
                      {Object.entries(CV_DATA.languages)
                        .map(([lang, level]) => `${lang} (${level})`)
                        .join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
