"use client";

import { useMemo } from "react";
import * as THREE from "three";

/** Canvas-generated concrete floor texture: subtle grid + a hazard-stripe border. */
function useFloorTexture() {
  return useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#171c26";
    ctx.fillRect(0, 0, size, size);

    // subtle concrete mottling
    for (let i = 0; i < 900; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 1.6 + 0.3;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // grid lines
    ctx.strokeStyle = "rgba(125, 211, 252, 0.08)";
    ctx.lineWidth = 2;
    const step = size / 16;
    for (let i = 0; i <= 16; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * step);
      ctx.lineTo(size, i * step);
      ctx.stroke();
    }

    // hazard stripe border (safety markings)
    const stripe = 28;
    ctx.save();
    const border = 36;
    [
      [0, 0, size, border],
      [0, size - border, size, border],
      [0, 0, border, size],
      [size - border, 0, border, size],
    ].forEach(([x, y, w, h]) => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.clip();
      ctx.translate(x, y);
      const diag = w + h;
      for (let i = -diag; i < diag; i += stripe * 2) {
        ctx.fillStyle = (i / (stripe * 2)) % 2 === 0 ? "#f5c518" : "#0b0d12";
        ctx.save();
        ctx.translate(i, 0);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-stripe, -diag, stripe, diag * 3);
        ctx.restore();
      }
      ctx.restore();
    });
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);
}

function Column({ position }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 5, 16]} />
        <meshStandardMaterial color="#39475e" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* hazard band near the base */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.22, 16]} />
        <meshStandardMaterial color="#f5c518" emissive="#3a2e03" emissiveIntensity={0.3} metalness={0.1} roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Room() {
  const floorTex = useFloorTexture();
  floorTex.repeat.set(2, 2);

  const columnPositions = [
    [-5.5, 0, -4.5],
    [5.5, 0, -4.5],
    [-5.5, 0, 2.5],
    [5.5, 0, 2.5],
  ];

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={floorTex} roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Back walls (partial enclosure so the camera can orbit freely later) */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <planeGeometry args={[20, 6]} />
        <meshStandardMaterial color="#10141d" roughness={1} />
      </mesh>
      <mesh position={[-7, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#0d1119" roughness={1} />
      </mesh>

      {/* Overhead trusses */}
      {[-3, 0, 3].map((z) => (
        <mesh key={z} position={[0, 5.1, z]} castShadow>
          <boxGeometry args={[11, 0.2, 0.2]} />
          <meshStandardMaterial color="#2a3242" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {columnPositions.map((p, i) => (
        <Column key={i} position={p} />
      ))}
    </group>
  );
}
