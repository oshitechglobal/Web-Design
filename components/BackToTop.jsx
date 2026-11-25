"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icon";

export default function BackToTop() {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return undefined;

    const trigger = ScrollTrigger.create({
      start: 600,
      end: "max",
      onToggle: (self) => {
        el.classList.toggle("opacity-0", !self.isActive);
        el.classList.toggle("pointer-events-none", !self.isActive);
      },
    });

    return () => trigger.kill();
  }, []);

  function handleClick() {
    if (typeof window.__lenis?.scrollTo === "function") {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-navy-950 text-cyan-300 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)] flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none hover:bg-navy-800"
    >
      <Icon name="arrow-right" className="w-5 h-5 -rotate-90" />
    </button>
  );
}
