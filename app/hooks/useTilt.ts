"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "../lib/gsap";

export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, maxDeg = 8) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    const rotateXTo = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power2.out" });
    const liftTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotateXTo(-py * maxDeg);
      rotateYTo(px * maxDeg);
      liftTo(-4);
    };
    const onLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      liftTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, maxDeg]);
}
