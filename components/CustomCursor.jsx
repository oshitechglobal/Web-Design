"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    function onMove(e) {
      gsap.set(dot, { x: e.clientX - 4, y: e.clientY - 4 });
      gsap.to(ringPos, {
        x: e.clientX - 18,
        y: e.clientY - 18,
        duration: 0.35,
        ease: "power2.out",
        onUpdate: () => gsap.set(ring, { x: ringPos.x, y: ringPos.y }),
      });
    }

    document.body.classList.add("cursor-none");
    window.addEventListener("mousemove", onMove);
    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
