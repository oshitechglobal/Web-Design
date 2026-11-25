"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { remap, smoothstep, lerp } from "./utils";

// Camera keyframes across the pre-orbit portion of the timeline (progress 0-0.85).
const KEYFRAMES = [
  { t: 0.0, pos: [0, 2.4, 9.5], look: [0, 1.2, -1] },
  { t: 0.15, pos: [0, 2.1, 7.6], look: [0, 1.1, -1.5] },
  { t: 0.4, pos: [2.6, 1.9, 5.4], look: [0.3, 1.2, -2] },
  { t: 0.7, pos: [-2.2, 2.1, 5.2], look: [0.8, 1.2, -2.6] },
  { t: 0.85, pos: [0, 3.3, 7.2], look: [0.5, 1.2, -2.2] },
];

const ORBIT_START = 0.85;
const ORBIT_RADIUS = 7.4;
const ORBIT_HEIGHT = 3.3;
const ORBIT_CENTER = [0.5, 1.2, -2.2];
const ORBIT_SWEEP = Math.PI * 0.6;

function sampleKeyframes(p) {
  if (p <= KEYFRAMES[0].t) return KEYFRAMES[0];
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (p >= a.t && p <= b.t) {
      const local = smoothstep(remap(p, a.t, b.t));
      return {
        pos: [lerp(a.pos[0], b.pos[0], local), lerp(a.pos[1], b.pos[1], local), lerp(a.pos[2], b.pos[2], local)],
        look: [lerp(a.look[0], b.look[0], local), lerp(a.look[1], b.look[1], local), lerp(a.look[2], b.look[2], local)],
      };
    }
  }
  return KEYFRAMES[KEYFRAMES.length - 1];
}

export default function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = progressRef.current;

    if (p < ORBIT_START) {
      const frame = sampleKeyframes(p);
      camera.position.set(...frame.pos);
      lookTarget.current.set(...frame.look);
    } else {
      const orbitT = remap(p, ORBIT_START, 1);
      const angle = -ORBIT_SWEEP / 2 + orbitT * ORBIT_SWEEP;
      camera.position.set(
        ORBIT_CENTER[0] + Math.sin(angle) * ORBIT_RADIUS,
        ORBIT_HEIGHT - orbitT * 0.6,
        ORBIT_CENTER[2] + Math.cos(angle) * ORBIT_RADIUS
      );
      lookTarget.current.set(ORBIT_CENTER[0], ORBIT_CENTER[1], ORBIT_CENTER[2]);
    }

    camera.lookAt(lookTarget.current);
  });

  return null;
}
