"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Wraps a single focusable child (button/link) and nudges it toward the
 * pointer within a small radius. Desktop/fine-pointer only - skipped on
 * touch devices and under prefers-reduced-motion.
 */
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const wantsRichInteraction =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!wantsRichInteraction) return undefined;

    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out" });
    }
    function onLeave() {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-flex">
      {children}
    </span>
  );
}
