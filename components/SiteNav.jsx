"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import Magnetic from "./Magnetic";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#nh3-specialists", label: "NH3 Specialists" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header id="site-nav" className="fixed top-0 inset-x-0 z-50 transition-all duration-300 glass-nav border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <span className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-navy-600 shadow-[0_8px_24px_-8px_rgba(45,212,238,0.6)]">
              <Icon name="atom" className="w-6 h-6 text-navy-950" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading font-bold text-lg text-white tracking-tight">
                TACS Cooling <span className="text-cyan-300">CC</span>
              </span>
              <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-white/50 font-semibold">
                NH3 &middot; Refrigeration
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link px-4 py-2 rounded-full text-white/80 hover:text-white transition${
                  activeHref === l.href ? " nav-link--active" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <a href="#contact" className="btn btn-primary hidden sm:inline-flex !py-2.5 !px-5 text-sm">
                Request Quote <Icon name="arrow-right" className="w-4 h-4" />
              </a>
            </Magnetic>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-panel"
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-white/90 hover:bg-white/10 transition"
            >
              <Icon name={open ? "close" : "menu"} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden mobile-panel-grid border-t border-white/5${open ? " is-open" : ""}`}>
        <div>
          <nav id="mobile-panel" className="flex flex-col px-5 py-4 gap-1 text-white/85 text-sm font-medium bg-navy-950" aria-label="Mobile">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-3 rounded-xl hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-2 justify-center">
              Request Quote <Icon name="arrow-right" className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
