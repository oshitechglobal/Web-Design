"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";
import Icon from "../Icon";
import Magnetic from "../Magnetic";
import { remap } from "./utils";
import useScrollTimeline from "./useScrollTimeline";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

function HeroOverlayCopy() {
  return (
    <div className="max-w-xl">
      <span className="pill-badge pill-badge--dark mb-6">
        <Icon name="atom" className="w-4 h-4" /> Industrial Cooling &amp; NH3 Refrigeration
      </span>
      <h1 className="font-heading font-bold text-white text-[2.3rem] leading-[1.06] sm:text-5xl md:text-6xl tracking-tight">
        From empty plant room to <span className="text-gradient-cyan">full ammonia cooling installation</span>
      </h1>
      <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed">
        Scroll to watch a TACS Cooling plant room come together — compressors, vessels, piping and controls, engineered for reliable NH3 refrigeration.
      </p>
    </div>
  );
}

function EndCTA() {
  return (
    <div className="max-w-md text-center">
      <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl">Need a system like this built right?</h2>
      <p className="mt-3 text-white/60">Talk to our engineers about an ammonia cooling installation designed around your plant.</p>
      <Magnetic>
        <a href="#contact" className="btn btn-primary mt-6">
          Request an Engineering Consultation <Icon name="arrow-right" className="w-4 h-4" />
        </a>
      </Magnetic>
    </div>
  );
}

/** Static, non-scroll-jacked render used for prefers-reduced-motion and the no-WebGL fallback. */
function StaticHeroFallback({ webglAvailable }) {
  return (
    <section id="home" className="relative h-[100svh] flex items-center bg-navy-950 overflow-hidden scroll-mt-20">
      {webglAvailable ? (
        <div className="absolute inset-0">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 3.3, 7.2], fov: 45 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.6;
            }}
          >
            <StaticScene />
          </Canvas>
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(45,212,238,0.25),transparent_60%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/50 to-navy-950 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <HeroOverlayCopy />
        <Magnetic>
          <a href="#contact" className="btn btn-primary mt-8">
            Request an Engineering Consultation <Icon name="arrow-right" className="w-4 h-4" />
          </a>
        </Magnetic>
      </div>
    </section>
  );
}

function StaticScene() {
  const progressRef = useRef(1);
  return <Scene progressRef={progressRef} />;
}

export default function CinematicHero() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const { progressRef, reducedMotion } = useScrollTimeline(wrapperRef, stageRef);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(detectWebGL());
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let raf;
    const tick = () => {
      const p = progressRef.current;
      if (headlineRef.current) {
        headlineRef.current.style.opacity = String(1 - remap(p, 0, 0.12));
      }
      if (ctaRef.current) {
        const o = remap(p, 0.95, 1.0);
        ctaRef.current.style.opacity = String(o);
        ctaRef.current.style.transform = `translateY(${(1 - o) * 16}px)`;
        ctaRef.current.style.pointerEvents = o > 0.5 ? "auto" : "none";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, progressRef]);

  if (reducedMotion) {
    return <StaticHeroFallback webglAvailable={webglAvailable} />;
  }

  return (
    <section id="home" ref={wrapperRef} className="relative h-[500vh]">
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-navy-950">
        <div className="absolute inset-0">
          {webglAvailable ? (
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 2.4, 9.5], fov: 45 }}
              gl={{ antialias: true, powerPreference: "high-performance" }}
              shadows
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.6;
              }}
            >
              <Scene progressRef={progressRef} />
            </Canvas>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(45,212,238,0.25),transparent_60%)]" />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1e26]/35 via-transparent to-[#1a1e26]/50 pointer-events-none" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_140px_40px_rgba(10,12,16,0.4)] pointer-events-none" />
        <div className="noise-overlay" />

        <div ref={headlineRef} className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <HeroOverlayCopy />
          </div>
        </div>

        <div
          ref={ctaRef}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <EndCTA />
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-white/40 text-xs tracking-[0.2em] uppercase">
          Scroll to build the plant
        </div>
      </div>
    </section>
  );
}
