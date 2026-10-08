"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import About from "./components/About";
import ChatBot from "./components/ChatBot";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { gsap, ScrollSmoother } from "./lib/gsap";

export default function Home() {
  const footerRef = useRef<HTMLElement>(null);
  const footerSocialsRef = useRef<HTMLDivElement>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);

  // Buttery inertial scroll (keeps every ScrollTrigger in sync automatically).
  // Disabled under reduced-motion so the page falls back to plain native scroll.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        smoothTouch: 0,
        effects: false,
      });

      // ScrollSmoother virtualizes scroll, so native anchor jumps (#section
      // links in NavBar/Hero) need to be routed through its own scrollTo.
      const onAnchorClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        smoother.scrollTo(target, true, "top top");
      };

      document.addEventListener("click", onAnchorClick);

      return () => {
        document.removeEventListener("click", onAnchorClick);
        smoother.kill();
      };
    });
  }, { scope: smoothWrapperRef });

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(footerRef.current, { opacity: 0, y: 30 });
        gsap.to(footerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" },
        });

        const icons = footerSocialsRef.current ? Array.from(footerSocialsRef.current.children) : [];
        gsap.set(icons, { opacity: 0, scale: 0, rotate: -180 });
        gsap.to(icons, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: footerSocialsRef.current, start: "top 95%" },
        });
      });
    },
    { scope: footerRef },
  );

  return (
    <main className="relative w-full bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise" />

      {/* Navigation stays outside the smooth-scroll wrapper so it remains fixed to the viewport */}
      <NavBar />

      <div id="smooth-wrapper" ref={smoothWrapperRef}>
        <div id="smooth-content">
          {/* Sections */}
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />

          {/* Footer */}
          <footer ref={footerRef} className="relative w-full py-6 px-4 border-t border-white/5 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-indigo-500/5 to-transparent" />

            <div className="relative max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                {/* Logo & Info */}
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                    <h3 className="text-2xl font-bold">
                      Abbas <span className="text-gradient">Fares</span>
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Full-Stack Developer • Problem Solver
                  </p>
                  <br />
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Abbas Fares. All rights reserved.
                  </p>
                </div>

                {/* Social Links */}
                <div ref={footerSocialsRef} className="flex gap-4">
                  {[
                    { icon: <FaGithub className="w-7 h-7" />, href: "https://github.com/abbas56fares/", label: "GitHub" },
                    { icon: <FaLinkedin className="w-7 h-7 text-[#0077B5]" />, href: "https://www.linkedin.com/in/abbas-fares-934781304", label: "LinkedIn" },
                    {
                      icon: <FaEnvelope className="w-7 h-7" />,
                      href: "mailto:faresabbas1997@gmail.com",
                      label: "Email",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:scale-110 hover:border-indigo-500/50 transition-all"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* AI Chatbot stays outside the smooth-scroll wrapper so it remains fixed to the viewport */}
      <ChatBot />
    </main>
  );
}
