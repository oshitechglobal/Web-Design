"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Pins `stageRef` inside the tall `wrapperRef` spacer and scrubs a shared
 * progress ref (0-1) as the user scrolls through it. The ref (not React
 * state) is what the R3F scene reads every frame via useFrame - avoiding a
 * React re-render on every scroll tick keeps this at 60fps.
 *
 * Returns { progressRef, reducedMotion, pinned }. When reducedMotion is
 * true, no ScrollTrigger/pin is created at all - the caller is expected to
 * render a static, non-scroll-jacked fallback instead.
 */
export default function useScrollTimeline(wrapperRef, stageRef) {
  const progressRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    if (mql.matches) return undefined;

    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      pin: stage,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
      onToggle: (self) => setPinned(self.isActive),
    });

    return () => {
      trigger.kill();
    };
  }, [wrapperRef, stageRef]);

  return { progressRef, reducedMotion, pinned };
}
