"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const navRef = useRef<HTMLElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isOpen || !mobilePanelRef.current) return;
      gsap.set(mobilePanelRef.current, { opacity: 0, y: -12, scale: 0.96 });
      gsap.to(mobilePanelRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "back.out(1.7)",
      });
    },
    { dependencies: [isOpen], scope: navRef },
  );

  useGSAP(() => {
    // ScrollTrigger caches each section's position once (on create/refresh)
    // instead of reading layout (offsetTop) on every scroll event, so this
    // can't thrash layout the way a raw scroll listener did.
    const triggers = NAV_LINKS.map((link) => {
      const section = document.querySelector<HTMLElement>(link.href);
      if (!section) return null;
      return ScrollTrigger.create({
        trigger: section,
        start: "top 180px",
        end: "bottom 180px",
        onToggle: (self) => {
          if (self.isActive) setActiveHref(link.href);
        },
      });
    });

    return () => triggers.forEach((t) => t?.kill());
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
    >
      {/* --- DESKTOP NAV: Stays as a wide bar --- */}
      <div
        className="hidden md:flex justify-center items-center glass rounded-full px-8 py-4 border border-white/20"
        style={{
          background: "rgba(19, 19, 26, 0.72)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
        }}
      >
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors group ${
                  isActive ? "text-indigo-400" : "text-gray-300"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="/Abbas-Fares-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-linear-to-r from-indigo-500 to-purple-500"
          >
            Resume
          </a>
        </div>
      </div>

      {/* --- MOBILE NAV: Separated logic --- */}
      <div className="md:hidden flex flex-col items-end">
        {/* The Toggle Button: Styled as a circle when closed */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          className={`glass flex items-center justify-center transition-all duration-300 active:scale-95 text-white border border-white/20
            ${isOpen ? "rounded-full p-2 mb-2" : "w-12 h-12 rounded-full"}`}
          style={{
            background: "rgba(19, 19, 26, 0.72)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* The Menu Content: Opens as a full-width box */}
        {isOpen && (
          <div
            ref={mobilePanelRef}
            id="mobile-nav-panel"
            className="glass w-full rounded-2xl p-6 border border-white/20"
            style={{
              background: "rgba(19, 19, 26, 0.78)",
              backdropFilter: "blur(30px) saturate(180%)",
              WebkitBackdropFilter: "blur(30px) saturate(180%)",
            }}
          >
            <div className="flex flex-col gap-3 ">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative font-medium transition-colors group ${
                      isActive ? "text-indigo-400" : "text-gray-300"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
              <a
                href="/Abbas-Fares-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-2 rounded-xl text-sm font-bold text-white text-center bg-linear-to-r from-indigo-500 to-purple-500"
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
