"use client";

import type { Engine, ISourceOptions } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { memo, useMemo } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// Module-scoped so the identity never changes: ParticlesProvider throws if the
// init callback isn't stable across the app lifecycle.
const initEngine = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

const ACCENT = "#6366f1";

// Generated into /public/skill-icons by hand from the same react-icons set
// Skills.tsx uses (see CLAUDE.md), each with a literal fill colour tuned to
// stay legible against the navy hero background.
const SKILL_ICONS = [
  "react",
  "nextjs",
  "vue",
  "tailwind",
  "laravel",
  "php",
  "nodejs",
  "fastapi",
  "mysql",
  "postgresql",
  "mongodb",
  "python",
  "git",
  "docker",
  "ai-agents",
  "rag",
  "ollama",
  "rest-apis",
  "cloud",
];

// PNG, not SVG, on purpose: tsParticles `drawImage`s every particle every
// frame, and Chrome re-rasterizes an SVG source at the destination size on
// each call. With 108 particles that showed up as a ~500ms main-thread freeze
// every time the hero scrolled back into view (e.g. clicking "Home" in the
// nav from any other section). A decoded PNG bitmap costs nothing to blit —
// same measurement dropped to ~10ms. The .png files are rasterized from the
// .svg siblings at 2x (128px); regenerate both if an icon changes.
const SKILL_IMAGES = SKILL_ICONS.map((name) => ({
  src: `/skill-icons/${name}.png`,
  width: 128,
  height: 128,
}));

/**
 * Interactive constellation canvas for the Hero section.
 *
 * Scoped to its parent (not `fullScreen`) on purpose: a full-screen canvas is
 * `position: fixed`, so it would sit behind `<main>`'s opaque background and
 * stay pinned while the page scrolls. The parent must be `position: relative`
 * (Hero's `<section>` is).
 */
function ParticleBackground() {
  const isPhone = useIsMobile(768);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Must stay referentially stable: the Particles effect re-creates the whole
  // container whenever `options` changes identity, and Hero re-renders every
  // ~100ms from the typewriter.
  const options = useMemo<ISourceOptions>(
    () => ({
      autoPlay: true,
      fullScreen: { enable: false },
      fpsLimit: 120,
      detectRetina: true,
      interactivity: {
        // Mouse is tracked on window and offset by the canvas rect — the
        // generated canvas is forced to `pointer-events: none` by the engine.
        detectsOn: "window",
        events: {
          onHover: {
            // No cursor on touch, so repulse would never fire there anyway.
            enable: !isPhone,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.4,
          },
        },
      },
      particles: {
        // v4 moved particle color under `paint` — a top-level
        // `particles.color` is silently ignored and dots render white.
        paint: {
          color: { value: ACCENT },
          fill: { enable: true },
        },
        links: {
          color: ACCENT,
          distance: isPhone ? 110 : 140,
          enable: true,
          opacity: 0.25,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 1.2,
          straight: false,
        },
        number: {
          // Fixed counts per breakpoint instead of `density`, whose
          // area-based factor scales the count (and the link work, which grows
          // with the square of it) right up on large monitors.
          density: { enable: false },
          value: isPhone ? 42 : 108,
        },
        opacity: { value: { min: 0.3, max: 0.7 } },
        // One skill icon per particle, picked at random from the set.
        shape: {
          type: "image",
          options: { image: SKILL_IMAGES },
        },
        // Radius, so rendered width is double this — 2x the 1-3 the plain dots used.
        size: { value: { min: 2, max: 6 } },
      },
    }),
    [isPhone],
  );

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <ParticlesProvider init={initEngine}>
        <Particles
          id="portfolio-particles"
          options={options}
          className="h-full w-full"
        />
      </ParticlesProvider>
    </div>
  );
}

// Hero re-renders on every typewriter tick; this component takes no props, so
// memo keeps those renders from reaching the canvas.
export default memo(ParticleBackground);
