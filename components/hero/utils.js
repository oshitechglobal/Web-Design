export function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

/** Remaps `v` from [start, end] to [0, 1], clamped. */
export function remap(v, start, end) {
  if (start === end) return v >= end ? 1 : 0;
  return clamp((v - start) / (end - start));
}

export function smoothstep(t) {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
}

/** easeOutBack - used for equipment "settling into place" after dropping. */
export function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = clamp(t);
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function lerpVec3(out, a, b, t) {
  out.x = lerp(a[0], b[0], t);
  out.y = lerp(a[1], b[1], t);
  out.z = lerp(a[2], b[2], t);
  return out;
}
