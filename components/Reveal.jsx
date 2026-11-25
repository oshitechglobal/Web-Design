"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-reveal wrapper. type="fade" slides up + fades in (section intros);
 * type="clip" scales+fades (card grids - deliberately not a clip-path wipe:
 * a self-clipped element's IntersectionObserver/ScrollTrigger bounds would
 * be degenerate and never fire as "entered").
 */
export default function Reveal({ children, as: Tag = "div", type = "fade", delay = 0, className = "", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      const from =
        type === "clip"
          ? { opacity: 0, scale: 0.94, y: 18 }
          : { opacity: 0, y: 22 };
      gsap.set(el, from);
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power3.out",
          });
        },
      });
    });

    return () => ctx.revert();
  }, [type, delay]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
