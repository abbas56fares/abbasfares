"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

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
// Repeated enough times that at least two full copies always exceed the
// widest realistic viewport, so the loop never shows trailing empty space
// before it resets (see CLAUDE.md "Known issues" for the math).
const MARQUEE_REPEAT = 8;

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);

  // Mouse parallax on the gradient orbs (compositor-only, no React re-render)
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const x1 = gsap.quickTo(orb1Ref.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const y1 = gsap.quickTo(orb1Ref.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    });
    const x2 = gsap.quickTo(orb2Ref.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const y2 = gsap.quickTo(orb2Ref.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth) * 30 - 15;
      const py = (e.clientY / window.innerHeight) * 30 - 15;
      x1(px);
      y1(py);
      x2(-px);
      y2(-py);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[currentRole];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < role.length) {
      timeout = setTimeout(() => {
        setDisplayText(role.substring(0, displayText.length + 1));
      }, 100);
    } else if (!isDeleting && displayText.length === role.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(role.substring(0, displayText.length - 1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % ROLES.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-20 overflow-hidden"
    >
      {/* Floating gradient orbs with parallax (outer = GSAP parallax, inner = CSS float, so the two transforms don't fight on one element) */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 will-change-transform"
      >
        <div className="w-96 h-96 bg-linear-to-r from-steel/30 to-sky/30 rounded-full blur-3xl animate-float" />
      </div>
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 will-change-transform"
      >
        <div
          className="w-96 h-96 bg-linear-to-r from-sky/30 to-ice/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main heading with gradient */}
        <h1
          ref={headlineRef}
          className="hero-heading-fluid font-black mb-8 leading-tight"
        >
          <span ref={greetingRef} className="block text-white mb-2">
            Hi, I&apos;m
          </span>
          <span ref={nameRef} className="block text-gradient">
            Abbas Fares
          </span>
        </h1>

        {/* Rotating role typewriter */}
        <div
          ref={typewriterRef}
          className="h-12 md:h-16 mb-8 flex items-center justify-center"
        >
          <p className="text-lg sm:text-2xl md:text-4xl font-bold text-white">
            {displayText}
            <span className="text-indigo-500 animate-pulse">|</span>
          </p>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="text-gray-400 text-sm sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Building secure, API-driven web applications and AI-powered systems
          with Laravel, React, and modern tooling.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex gap-4 justify-center flex-wrap mt-5 mb-12"
        >
          <a
            ref={primaryCtaRef}
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

      {/* Tech stack marquee — full width, breaks out of the max-w-6xl content column */}
      <div
        ref={pillsRef}
        className="relative z-10 self-stretch -mx-4 mt-8 glass py-3 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div
          className="marquee-track flex w-max items-center gap-10"
          style={{ "--marquee-repeat": MARQUEE_REPEAT } as React.CSSProperties}
        >
          {Array.from({ length: MARQUEE_REPEAT }, () => TECH_STACK)
            .flat()
            .map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-sm font-medium text-gray-300 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
