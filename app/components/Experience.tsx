"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { FaBriefcase, FaGraduationCap, FaCertificate } from "react-icons/fa";
import { gsap } from "../lib/gsap";

const experience = {
  title: "Full-Stack Web Developer Intern",
  company: "VioletPro",
  duration: "September 2025 – November 2025",
  points: [
    "Developed Laravel backends and MySQL databases for digital menu systems with a Vue.js frontend, delivering fully functional applications that consistently met client requirements.",
    "Deployed custom content management solutions and responsive web applications from scratch, ensuring smooth performance across devices, browsers, and screen sizes.",
    "Enhanced backend logic and overall system performance through careful code review, resulting in faster response times and improved user experience.",
    "Managed version control and codebase structuring using Git and GitHub, enabling smoother collaboration within the development team.",
  ],
};

const education = {
  degree: "Bachelor of Science in Computer Science",
  institution: "Lebanese International University (LIU)",
  duration: "February 2026",
};

const certificates = [
  { name: "CCNAv7: Introduction to Networks", issuer: "Cisco Networking Academy", date: "March 2024" },
  { name: "CCNAv7: Switching, Routing, and Wireless Essentials", issuer: "Cisco Networking Academy", date: "August 2024" },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const workCardRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(headerRef.current, { opacity: 0, y: 24 });
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });

        gsap.set(workCardRef.current, { opacity: 0, x: -40 });
        gsap.to(workCardRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: workCardRef.current, start: "top 85%" },
        });

        const bullets = workCardRef.current?.querySelectorAll("li") ?? [];
        gsap.set(bullets, { opacity: 0, x: -16 });
        gsap.to(bullets, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: workCardRef.current, start: "top 75%" },
        });

        const bottomChildren = bottomRowRef.current ? Array.from(bottomRowRef.current.children) : [];
        gsap.set(bottomChildren, { opacity: 0, y: 30 });
        gsap.to(bottomChildren, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: bottomRowRef.current, start: "top 85%" },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-32 px-4 overflow-hidden"
    >
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-steel/10 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-5xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="heading-fluid font-black mb-4">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
        </div>

        {/* Work Experience */}
        <div ref={workCardRef} className="modern-card p-4 sm:p-8 lg:p-10 mb-8">
          <div className="flex items-start gap-3 sm:gap-5">
            <div className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
              <FaBriefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5 sm:mb-3">
                <h3 className="text-sm sm:text-2xl font-bold text-white">
                  {experience.title} · {experience.company}
                </h3>
                <span className="text-[10px] sm:text-sm text-sky font-medium shrink-0">
                  {experience.duration}
                </span>
              </div>
              <ul className="space-y-1 sm:space-y-2">
                {experience.points.map((point) => (
                  <li
                    key={point}
                    className="text-gray-400 text-[11px] sm:text-base leading-snug sm:leading-relaxed flex gap-2"
                  >
                    <span className="text-sky mt-1">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div ref={bottomRowRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="modern-card p-4 sm:p-8">
            <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-4">
              <div className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="card-title-fluid font-bold text-white mb-1">
                  {education.degree}
                </h3>
                <p className="text-gray-400 card-text-fluid mb-1">{education.institution}</p>
                <p className="text-sky card-text-fluid font-medium">{education.duration}</p>
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className="modern-card p-4 sm:p-8">
            <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:gap-4">
              <div className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <FaCertificate className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.name}>
                    <p className="text-white font-semibold card-text-fluid leading-snug">{cert.name}</p>
                    <p className="text-gray-500 card-text-fluid">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
