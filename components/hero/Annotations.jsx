"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { remap } from "./utils";

const CALLOUTS = [
  {
    position: [-1.5, 1.35, -2.3],
    start: 0.72,
    end: 0.79,
    title: "Compressor Efficiency",
    value: "Rated duty cycle maintained across variable ammonia load.",
  },
  {
    position: [2.6, 2.2, -1.6],
    start: 0.77,
    end: 0.84,
    title: "Leak & Safety Containment",
    value: "NH3-rated vessel sealing with continuous leak-detection support.",
  },
  {
    position: [4.2, 1.9, -3],
    start: 0.82,
    end: 0.89,
    title: "Automated PLC Monitoring",
    value: "Plant-room status and alarms monitored around the clock.",
  },
  {
    position: [0.6, 1.0, -3.4],
    start: 0.87,
    end: 0.94,
    title: "Thermal Load Capacity",
    value: "Heat-exchange sizing matched to peak cold-storage demand.",
  },
];

function Callout({ position, start, end, title, value, progressRef }) {
  const elRef = useRef(null);

  useFrame(() => {
    if (!elRef.current) return;
    const p = progressRef.current;
    const fadeIn = remap(p, start, Math.min(start + 0.03, end));
    const fadeOut = 1 - remap(p, Math.max(end - 0.03, start), end);
    const opacity = Math.min(fadeIn, fadeOut);
    elRef.current.style.opacity = String(opacity);
    elRef.current.style.transform = `translateY(${(1 - opacity) * 8}px)`;
  });

  return (
    <Html position={position} distanceFactor={8} center transform={false} zIndexRange={[20, 0]}>
      <div
        ref={elRef}
        className="w-56 -translate-x-1/2 rounded-xl border border-cyan-400/25 bg-navy-950/85 backdrop-blur px-4 py-3 text-left shadow-[0_12px_32px_-10px_rgba(0,0,0,0.6)]"
        style={{ opacity: 0 }}
      >
        <p className="text-cyan-300 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">{title}</p>
        <p className="mt-1 text-white/70 text-xs leading-relaxed">{value}</p>
      </div>
    </Html>
  );
}

export default function Annotations({ progressRef }) {
  return (
    <>
      {CALLOUTS.map((c) => (
        <Callout key={c.title} {...c} progressRef={progressRef} />
      ))}
    </>
  );
}
