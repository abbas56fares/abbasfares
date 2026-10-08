"use client";

import { JSX, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss,
  SiLaravel, SiPhp, SiNodedotjs, SiFastapi,
  SiMysql, SiPostgresql, SiMongodb,
  SiPython, SiGit, SiDocker,
} from "react-icons/si";
import { FaBrain, FaSearch, FaRobot, FaCode, FaCloud } from "react-icons/fa";
import { useIsMobile } from "../hooks/useIsMobile";
import { gsap } from "../lib/gsap";

interface Skill {
  name: string;
  icon: JSX.Element;
  color: string;
  level: number;
}

const skills: Skill[] = [
  { name: "React", icon: <SiReact />, color: "from-cyan-400 to-blue-500", level: 80 },
  { name: "Next.js", icon: <SiNextdotjs />, color: "from-gray-600 to-gray-300", level: 75 },
  { name: "Vue", icon: <SiVuedotjs />, color: "from-green-400 to-green-600", level: 80 },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "from-teal-400 to-cyan-600", level: 85 },
  { name: "Laravel", icon: <SiLaravel />, color: "from-red-500 to-orange-600", level: 85 },
  { name: "PHP", icon: <SiPhp />, color: "from-indigo-400 to-purple-600", level: 85 },
  { name: "Node.js", icon: <SiNodedotjs />, color: "from-green-500 to-green-700", level: 70 },
  { name: "FastAPI", icon: <SiFastapi />, color: "from-teal-500 to-emerald-600", level: 65 },
  { name: "MySQL", icon: <SiMysql />, color: "from-blue-500 to-cyan-600", level: 85 },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "from-blue-600 to-indigo-700", level: 65 },
  { name: "MongoDB", icon: <SiMongodb />, color: "from-green-600 to-green-800", level: 55 },
  { name: "Python", icon: <SiPython />, color: "from-yellow-500 to-blue-600", level: 75 },
  { name: "AI Agents", icon: <FaBrain />, color: "from-purple-500 to-pink-500", level: 65 },
  { name: "RAG", icon: <FaSearch />, color: "from-fuchsia-500 to-purple-600", level: 65 },
  { name: "Ollama", icon: <FaRobot />, color: "from-slate-600 to-slate-800", level: 60 },
  { name: "Git", icon: <SiGit />, color: "from-orange-600 to-red-600", level: 80 },
  { name: "Docker", icon: <SiDocker />, color: "from-blue-500 to-cyan-600", level: 60 },
  { name: "REST APIs", icon: <FaCode />, color: "from-indigo-500 to-purple-500", level: 85 },
  { name: "Cloud Hosting", icon: <FaCloud />, color: "from-sky-500 to-blue-600", level: 55 },
];

const STACK_SIZE = 4;
const STACKS_PER_PAGE_DESKTOP = 3;
const STACKS_PER_PAGE_MOBILE = 1;

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skill-card modern-card p-4 flex items-center gap-4">
      <div
        className={`w-8 h-8 rounded-xl bg-linear-to-br ${skill.color} flex items-center justify-center text-sm text-white shrink-0`}
      >
        {skill.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5 gap-2">
          <span className="text-white font-semibold text-sm truncate">{skill.name}</span>
          <span className="text-gray-400 text-xs font-bold shrink-0">{skill.level}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className={`skill-fill bg-linear-to-r ${skill.color} h-full w-full rounded-full origin-left scale-x-0`}
            data-level={skill.level}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const reducedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isMobile = useIsMobile(640);

  const pages = useMemo(() => {
    const stacksPerPage = isMobile ? STACKS_PER_PAGE_MOBILE : STACKS_PER_PAGE_DESKTOP;
    const stacks: Skill[][] = [];
    for (let i = 0; i < skills.length; i += STACK_SIZE) {
      stacks.push(skills.slice(i, i + STACK_SIZE));
    }
    const chunks: Skill[][][] = [];
    for (let i = 0; i < stacks.length; i += stacksPerPage) {
      chunks.push(stacks.slice(i, i + stacksPerPage));
    }
    return chunks;
  }, [isMobile]);
  const pageCount = pages.length;
  const activePage = Math.min(page, pageCount - 1);

  // No entrance animation — header/track render fully visible immediately.
  // reducedRef is still needed by goTo()'s pagination-slide transition below.
  useGSAP(
    () => {
      reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    { scope: containerRef },
  );

  // Fill bars for the active page: set instantly under reduced motion,
  // animate otherwise. Re-runs whenever pagination swaps the rendered cards.
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const fills = gsap.utils.toArray<HTMLElement>(".skill-fill", trackRef.current);

      fills.forEach((fill) => {
        const level = Number(fill.dataset.level) / 100;
        if (reduced) {
          gsap.set(fill, { scaleX: level });
        } else {
          gsap.fromTo(fill, { scaleX: 0 }, { scaleX: level, duration: 0.9, ease: "power3.out", delay: 0.1 });
        }
      });
    },
    { dependencies: [activePage], scope: containerRef },
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
      id="skills"
      className="relative w-full py-32 px-6 md:px-8 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-sky/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/3 -left-20 w-96 h-96 bg-steel/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="heading-fluid font-black mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <br />
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl">
            Technologies I work with daily
          </p>
        </div>

        {/* Paginated Skills Carousel */}
        <div
          ref={trackRef}
          onPointerDown={onSwipeStart}
          onPointerUp={onSwipeEnd}
          onPointerCancel={() => (swipeRef.current.active = false)}
          className="flex flex-wrap justify-center gap-6 px-2 touch-pan-y"
        >
          {pages[activePage].map((stack, stackIdx) => (
            <div
              key={stackIdx}
              className="flex flex-col gap-4 basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] sm:min-h-[340px]"
            >
              {stack.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          ))}
        </div>

        {/* Page Dots. The visual dot stays small; a padded, invisible hit
            area brings the actual tap target to a touch-friendly size
            without changing how the dots look. */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to skills page ${i + 1}`}
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
