"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wires Lenis smooth scroll to GSAP's ticker/ScrollTrigger so every
 * ScrollTrigger-driven animation in the app (the cinematic hero included)
 * scrubs against Lenis's eased scroll position instead of raw native
 * scroll, which is what keeps pinning and scrubbing in sync.
 * Skipped entirely under prefers-reduced-motion: native scroll stays in
 * charge and nothing hijacks the wheel/touch input.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({ scroller: window });

    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return children;
}
