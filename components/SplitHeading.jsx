"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Word-split scroll reveal for headings. Each word gets its own overflow-hidden
 * wrapper (.split-word) around an inner span (.split-word-inner) that GSAP
 * animates up into place - the two-layer structure is what lets the wrapper
 * clip the word while the inner span translates, instead of clipping the
 * whole line. Any gradient-text class on a child span must be re-applied to
 * each of ITS OWN words too (background-clip:text only clips an element's
 * own direct text, not text moved into nested spans by the split).
 */
export default function SplitHeading({ as: Tag = "h2", className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    function wrapWords(node, gradientClass) {
      const frag = document.createDocumentFragment();
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/);
        for (const w of words) {
          if (w.trim() === "") {
            frag.appendChild(document.createTextNode(w));
            continue;
          }
          const wrap = document.createElement("span");
          wrap.className = "split-word";
          const inner = document.createElement("span");
          inner.className = `split-word-inner${gradientClass ? ` ${gradientClass}` : ""}`;
          inner.textContent = w;
          wrap.appendChild(inner);
          frag.appendChild(wrap);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const isGradient = node.classList?.contains("text-gradient-cyan");
        const childGradient = isGradient ? "text-gradient-cyan" : gradientClass;
        for (const child of Array.from(node.childNodes)) {
          frag.appendChild(wrapWords(child, childGradient));
        }
      } else {
        frag.appendChild(node.cloneNode(true));
      }
      return frag;
    }

    if (el.dataset.splitReady !== "true") {
      const originalNodes = Array.from(el.childNodes).map((n) => n.cloneNode(true));
      el.innerHTML = "";
      for (const node of originalNodes) {
        el.appendChild(wrapWords(node, null));
      }
      el.dataset.splitReady = "true";
    }

    const inners = el.querySelectorAll(".split-word-inner");

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 112, rotate: 4 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(inners, {
            yPercent: 0,
            rotate: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.035,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
