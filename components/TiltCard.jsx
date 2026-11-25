"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function TiltCard({ as: Tag = "div", className = "", children, ...rest }) {
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
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateX: py * -6,
        rotateY: px * 6,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    function onLeave() {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Tag ref={ref} className={`tilt-card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
