"use client";

import { useGSAP } from "@gsap/react";
import { JSX, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCoffee,
  FaImages,
  FaMobileAlt,
  FaRobot,
  FaTruck,
} from "react-icons/fa";
import { useIsMobile } from "../hooks/useIsMobile";
import { gsap } from "../lib/gsap";

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  icon: JSX.Element;
  images: string[];
  github?: string;
  demo?: string;
  note?: string;
}

const projects: Project[] = [
  {
    title: "Full-Stack Delivery Management System",
    description:
      "Senior project: architected a multi-role delivery platform with role-based access, global admin oversight, and branch-specific controls. Integrates real-time tracking via Maps API and secure QR code / OTP validation for reliable order confirmation.",
    tech: [
      "Laravel + Blades",
      "PHP",
      "MySQL",
      "JavaScript",
      "Maps API (Leaflet)",
      "REST APIs",
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    icon: <FaTruck className="w-5 h-5 text-white" />,
    images: [
      // "/images/projects/delivery-management/1.jpg",
      // "/images/projects/delivery-management/2.jpg",
    ],
    github: "https://github.com/abbas56fares/BaladiPick",
  },
  {
    title: "AI-Powered Task Management System",
    description:
      "A full-stack task management platform combining AI agents with Retrieval-Augmented Generation (RAG) for smarter daily planning, decision-making, and automated recommendations.",
    tech: [
      "Next.js",
      "Laravel",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "ChromaDB",
      "Ollama",
      "RAG",
      "AI Agents",
    ],
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    icon: <FaRobot className="w-5 h-5 text-white" />,
    images: [
      // "/images/projects/ai-task-management/1.jpg",
      // "/images/projects/ai-task-management/2.jpg",
    ],
  },
  {
    title: "HabitFlow",
    description:
      "A comprehensive habit-tracking application with a relational database schema for managing user data and progress logs over time, helping users stay consistent with daily habits.",
    tech: ["React", "Node.js", "Express", "MySQL"],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: <FaChartLine className="w-5 h-5 text-white" />,
    images: [
      // "/images/projects/habitflow/1.jpg",
      // "/images/projects/habitflow/2.jpg",
    ],
    github: "https://github.com/abbas56fares/HabitFlow",
    demo: "https://ezhabitflow.netlify.app/",
    note: "deployed version is static",
  },
  {
    title: "Interactive Digital Menu System",
    description:
      "A full-featured digital menu system with a complete admin dashboard, built on the VILT stack for restaurant and business operations.",
    tech: [
      "VILT Stack: Laravel, Vue, Inertia, Tailwind CSS",
      "MySQL",
      "JavaScript",
      "Admin Dashboard",
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    icon: <FaMobileAlt className="w-5 h-5 text-white" />,
    images: [
      // "/images/projects/digital-menu/1.jpg",
      // "/images/projects/digital-menu/2.jpg",
    ],
    github: "https://github.com/abbas56fares/menu-admin-portal",
    demo: "https://menu-static.laravel.cloud/",
    note: "deployed version is static",
  },
  {
    title: "Café Website with Online Ordering & Offline POS",
    description:
      "A full-stack café website combining online ordering with an offline Point-of-Sale system for in-store operations.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "POS System"],
    gradient: "from-orange-500 via-red-500 to-yellow-500",
    icon: <FaCoffee className="w-5 h-5 text-white" />,
    images: [
      // "/images/projects/cafe-website/1.jpg",
      // "/images/projects/cafe-website/2.jpg",
    ],
    github: "https://github.com/abbas56fares/menu",
    demo: "https://issacaffee.netlify.app/",
    note: "deployed version is static",
  },
  {
    title: "Interactive Modern Agenda System",
    description:
      "A scheduling and agenda management system for organizing tasks and appointments with a clean, responsive interface.",
    tech: ["Laravel + Blades", "MySQL", "JavaScript", "Tailwind CSS"],
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: <FaCalendarAlt className="w-5 h-5 text-white" />,
    images: [
      // "/images/projects/agenda-system/1.jpg",
      // "/images/projects/agenda-system/2.jpg",
    ],
  },
];

const PER_PAGE_DESKTOP = 3;
const PER_PAGE_MOBILE = 1;

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs text-center px-2">
          Image coming soon
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="relative h-full" style={{ perspective: "1500px" }}>
      <div
        className="relative h-full transition-transform duration-700 motion-reduce:transition-none transform-3d"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front Face */}
        {/* No fixed height on mobile: content (esp. the description) must be
            free to grow so longer project text never gets clipped by
            .modern-card's overflow:hidden. Desktop grid rows still need
            h-full so the 3 cards in a row match height. */}
        <div className="project-card glass modern-card p-4 lg:p-6 flex flex-col lg:h-full backface-hidden [-webkit-backface-visibility:hidden]">
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-label={`View screenshots of ${project.title}`}
            className={`relative w-9 h-9 lg:w-12 lg:h-12 rounded-lg lg:rounded-2xl bg-linear-to-br ${project.gradient} flex items-center justify-center text-lg lg:text-2xl mb-2 lg:mb-4 shadow-lg shrink-0 animate-breathe`}
          >
            {project.icon}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white text-gray-900 flex items-center justify-center text-[8px] shadow-md">
              <FaImages />
            </span>
          </button>

          <h3 className="text-base lg:text-2xl font-bold text-white mb-1.5 lg:mb-3">
            {project.title}
          </h3>

          <p className="text-gray-400 text-[11px] lg:text-sm leading-snug lg:leading-relaxed mb-2 lg:mb-4 grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-2 lg:mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 lg:px-3 lg:py-1 text-[9px] lg:text-xs bg-white/5 border border-white/10 rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="text-red-400 font-bold text-[10px] lg:text-xs">
            {project.note}
          </span>

          <div className="flex gap-2 lg:gap-3 pt-2 lg:pt-4 border-t border-white/5">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-1.5 px-3 lg:py-3 lg:px-6 bg-linear-to-r ${project.gradient} text-[10px] lg:text-sm rounded-lg lg:rounded-xl text-white font-medium text-center`}
              >
                View Project
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-3 lg:py-3 lg:px-6 bg-white/5 border border-white/10 rounded-lg lg:rounded-xl text-[10px] lg:text-sm text-gray-300 font-medium flex items-center justify-center gap-2"
            >
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Back Face: Screenshots */}
        <div className="modern-card p-4 lg:p-6 absolute inset-x-0 top-0 min-h-full flex flex-col backface-hidden [-webkit-backface-visibility:hidden] transform-[rotateY(180deg)]">
          <div className="flex items-center justify-between gap-3 mb-2 lg:mb-4">
            <h3 className="text-xs lg:text-lg font-bold text-white truncate">
              {project.title}
            </h3>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="shrink-0 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] lg:text-xs text-gray-300 font-medium"
            >
              Back
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-3">
            {project.images.map((src, i) => (
              <ProjectImage
                key={src}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const reducedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  // 1024 = Tailwind's `lg` breakpoint (our "Wide" category's lower bound) —
  // must match the `lg:grid-cols-3` below so the JS page-chunking and the
  // CSS column count switch at the same breakpoint.
  const isMobile = useIsMobile(1024);

  const pages = useMemo(() => {
    const perPage = isMobile ? PER_PAGE_MOBILE : PER_PAGE_DESKTOP;
    const chunks: Project[][] = [];
    for (let i = 0; i < projects.length; i += perPage) {
      chunks.push(projects.slice(i, i + perPage));
    }
    return chunks;
  }, [isMobile]);
  const pageCount = pages.length;
  const activePage = Math.min(page, pageCount - 1);

  // No entrance animation — header/track render fully visible immediately.
  // reducedRef is still needed by goTo()'s pagination-slide transition below.
  useGSAP(
    () => {
      reducedRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    },
    { scope: containerRef },
  );

  const goTo = (next: number) => {
    if (isAnimatingRef.current) return;
    const clamped = (next + pageCount) % pageCount;
    if (clamped === page) return;
    const dir = next < page ? -1 : 1;

    if (reducedRef.current || !trackRef.current) {
      setPage(clamped);
      return;
    }

    isAnimatingRef.current = true;
    gsap.to(trackRef.current, {
      opacity: 0,
      x: -dir * 40,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setPage(clamped);
        gsap.fromTo(
          trackRef.current,
          { opacity: 0, x: dir * 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          },
        );
      },
    });
  };

  // Swipe left/right to navigate pages (touch-action: pan-y lets vertical
  // page scroll keep working natively while we handle the horizontal axis).
  const swipeRef = useRef({ x: 0, y: 0, active: false });

  const onSwipeStart = (e: React.PointerEvent) => {
    swipeRef.current = { x: e.clientX, y: e.clientY, active: true };
  };

  const onSwipeEnd = (e: React.PointerEvent) => {
    if (!swipeRef.current.active) return;
    swipeRef.current.active = false;
    const dx = e.clientX - swipeRef.current.x;
    const dy = e.clientY - swipeRef.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      goTo(page + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full py-32 px-6 md:px-8 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-steel/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky/10 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="heading-fluid font-black mb-4">
            Featured <span className="text-gradient ">Projects</span>
          </h2>
          <br />
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl">
            Building innovative solutions that make a difference
          </p>
        </div>

        {/* Paginated Projects Carousel */}
        <div
          ref={trackRef}
          onPointerDown={onSwipeStart}
          onPointerUp={onSwipeEnd}
          onPointerCancel={() => (swipeRef.current.active = false)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2 touch-pan-y"
        >
          {pages[activePage].map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Page Dots. The visual dot stays small; a padded hit area brings
            the actual tap target to a touch-friendly size without changing
            how the dots look. */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to projects page ${i + 1}`}
                className="relative p-2.5"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === activePage ? "w-8 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
