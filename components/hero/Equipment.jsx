"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { remap, easeOutBack, lerp } from "./utils";

/** Drops a group in from above and settles with a slight overshoot. */
function useDropIn(groupRef, progressRef, start, end, restY, dropHeight = 6) {
  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const p = progressRef.current;
    const t = remap(p, start, end);
    const eased = easeOutBack(t);
    g.position.y = lerp(restY + dropHeight, restY, eased);
    g.visible = p >= start - 0.02;
  });
}

/** Fades + slides a group a short distance into place (connecting pieces). */
function useSlideFadeIn(groupRef, matRefs, progressRef, start, end, axis = "y", dist = 1.4, restPos = 0) {
  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const p = progressRef.current;
    const t = remap(p, start, end);
    const eased = t * t * (3 - 2 * t);
    g.position[axis] = lerp(restPos + dist, restPos, eased);
    g.visible = p >= start - 0.02;
    for (const m of matRefs) {
      if (m?.current) m.current.opacity = eased;
    }
  });
}

function CompressorUnit({ position, progressRef, start, end }) {
  const group = useRef();
  useDropIn(group, progressRef, start, end, position[1], 5.5);
  return (
    <group ref={group} position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.75, 0.85]} />
        <meshStandardMaterial color="#1c2a42" metalness={0.5} roughness={0.45} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 1, 20]} />
        <meshStandardMaterial color="#5b6b82" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0.52, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.035, 10, 20]} />
        <meshStandardMaterial color="#232b38" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Vessel({ position, progressRef, start, end, height = 1.8 }) {
  const group = useRef();
  useDropIn(group, progressRef, start, end, position[1], 6);
  return (
    <group ref={group} position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <capsuleGeometry args={[0.36, height - 0.72, 6, 16]} />
        <meshStandardMaterial color="#8f9bab" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, height + 0.05, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#2dd4ee" emissive="#2dd4ee" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Pipe({ from, to, radius = 0.06, progressRef, start, end, matRefs }) {
  const group = useRef();
  const length = Math.hypot(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2];
  const dir = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
  const yaw = Math.atan2(dir[0], dir[2]);
  const horiz = Math.hypot(dir[0], dir[2]);
  const pitch = Math.atan2(dir[1], horiz);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = progressRef.current;
    const t = remap(p, start, end);
    const eased = t * t * (3 - 2 * t);
    g.visible = p >= start - 0.02;
    g.scale.setScalar(Math.max(eased, 0.001));
    for (const m of matRefs || []) {
      if (m?.current) m.current.opacity = eased;
    }
  });

  return (
    <group ref={group} position={mid} rotation={[0, yaw, 0]}>
      <mesh rotation={[Math.PI / 2 + pitch, 0, 0]} castShadow>
        <cylinderGeometry args={[radius, radius, length, 12]} />
        <meshStandardMaterial ref={matRefs?.[0]} color="#6b7a8f" metalness={0.65} roughness={0.35} transparent opacity={0} />
      </mesh>
    </group>
  );
}

function Valve({ position, progressRef, start, end }) {
  const group = useRef();
  const matRef = useRef();
  useSlideFadeIn(group, [matRef], progressRef, start, end, "y", 1, position[1]);
  return (
    <group ref={group} position={position}>
      <mesh castShadow>
        <torusGeometry args={[0.16, 0.045, 10, 20]} />
        <meshStandardMaterial ref={matRef} color="#e8972f" emissive="#e8972f" emissiveIntensity={0.25} transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

function HeatExchanger({ position, progressRef, start, end }) {
  const group = useRef();
  const matRef = useRef();
  useSlideFadeIn(group, [matRef], progressRef, start, end, "y", 1.4, position[1]);
  const fins = Array.from({ length: 10 }, (_, i) => i);
  return (
    <group ref={group} position={position}>
      <mesh>
        <boxGeometry args={[0.9, 0.05, 0.6]} />
        <meshStandardMaterial ref={matRef} color="#3a4558" metalness={0.5} roughness={0.5} transparent opacity={0} />
      </mesh>
      {fins.map((i) => (
        <mesh key={i} position={[0, 0.06 + i * 0.09, 0]}>
          <boxGeometry args={[0.88, 0.02, 0.58]} />
          <meshStandardMaterial color="#7dd3fc" metalness={0.4} roughness={0.3} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function ControlPanel({ position, progressRef, start, end }) {
  const group = useRef();
  const matRef = useRef();
  const screenRef = useRef();
  useSlideFadeIn(group, [matRef], progressRef, start, end, "y", 1.2, position[1]);

  useFrame((state) => {
    if (!screenRef.current) return;
    const pulse = 0.9 + Math.sin(state.clock.elapsedTime * 1.6) * 0.5;
    screenRef.current.emissiveIntensity = Math.max(pulse, 0.1) * (group.current?.visible ? 1 : 0);
  });

  return (
    <group ref={group} position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.3, 0.15]} />
        <meshStandardMaterial ref={matRef} color="#141a24" metalness={0.3} roughness={0.6} transparent opacity={0} />
      </mesh>
      <mesh position={[0, 0.15, 0.085]}>
        <planeGeometry args={[0.6, 0.5]} />
        <meshStandardMaterial ref={screenRef} color="#06202a" emissive="#2dd4ee" emissiveIntensity={0.8} toneMapped={false} />
      </mesh>
      <mesh position={[-0.2, -0.45, 0.085]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#e8972f" emissive="#e8972f" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      <mesh position={[0.2, -0.45, 0.085]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#2dd4ee" emissive="#2dd4ee" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function Equipment({ progressRef }) {
  const pipe1Mat = useRef();
  const pipe2Mat = useRef();
  const pipe3Mat = useRef();

  return (
    <group>
      {/* Stage 1 - primary heavy equipment (0.15-0.40) */}
      <CompressorUnit position={[-2.4, 0.4, -2.2]} progressRef={progressRef} start={0.16} end={0.3} />
      <CompressorUnit position={[-0.6, 0.4, -2.4]} progressRef={progressRef} start={0.2} end={0.34} />
      <Vessel position={[2.2, 0, -2]} progressRef={progressRef} start={0.22} end={0.36} />
      <Vessel position={[3.1, 0, -1.2]} progressRef={progressRef} start={0.26} end={0.4} height={1.5} />

      {/* Stage 2 - piping, valves, heat exchanger, control panel (0.40-0.70) */}
      <Pipe from={[-2.4, 0.78, -2.2]} to={[-0.6, 0.78, -2.4]} progressRef={progressRef} start={0.42} end={0.52} matRefs={[pipe1Mat]} />
      <Pipe from={[-0.6, 0.78, -2.4]} to={[2.2, 0.9, -2]} progressRef={progressRef} start={0.46} end={0.56} matRefs={[pipe2Mat]} />
      <Pipe from={[2.2, 1.6, -2]} to={[3.1, 1.3, -1.2]} progressRef={progressRef} start={0.5} end={0.6} matRefs={[pipe3Mat]} />
      <Valve position={[-0.6, 0.78, -2.4]} progressRef={progressRef} start={0.48} end={0.58} />
      <Valve position={[2.2, 0.9, -2]} progressRef={progressRef} start={0.52} end={0.62} />
      <HeatExchanger position={[0.6, 0.2, -3.4]} progressRef={progressRef} start={0.54} end={0.66} />
      <ControlPanel position={[4.2, 0.95, -3]} progressRef={progressRef} start={0.58} end={0.7} />
    </group>
  );
}
