"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector2 } from "three";
import { EffectComposer, ChromaticAberration } from "@react-three/postprocessing";

const MAX_OFFSET = 0.0055;
const VELOCITY_GAIN = 16;
const SMOOTHING = 7;

/**
 * Scroll-velocity-driven chromatic aberration, in the spirit of igloo.inc's
 * frost/displacement scene transitions: a radial colour-fringe flare that
 * flashes up while scrolling fast (crossing between stages) and settles
 * back to zero at rest, rather than a constant always-on effect.
 */
export default function PostFX({ progressRef }) {
  const effectRef = useRef(null);
  const state = useRef({ lastProgress: 0, offset: 0 });
  const initialOffset = useMemo(() => new Vector2(0, 0), []);

  useFrame((_, delta) => {
    const effect = effectRef.current;
    if (!effect) return;

    const p = progressRef.current;
    const dt = Math.max(delta, 0.0001);
    const velocity = Math.abs(p - state.current.lastProgress) / dt;
    state.current.lastProgress = p;

    const target = Math.min(velocity * VELOCITY_GAIN, 1) * MAX_OFFSET;
    state.current.offset += (target - state.current.offset) * Math.min(dt * SMOOTHING, 1);

    effect.offset.set(state.current.offset, state.current.offset * 0.6);
  });

  return (
    <EffectComposer multisampling={0}>
      <ChromaticAberration ref={effectRef} offset={initialOffset} radialModulation modulationOffset={0.3} />
    </EffectComposer>
  );
}
