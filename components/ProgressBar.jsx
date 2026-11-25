"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return undefined;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        el.style.width = `${self.progress * 100}%`;
      },
    });

    return () => trigger.kill();
  }, []);

  return <div id="progress-bar" ref={barRef} aria-hidden="true" />;
}
