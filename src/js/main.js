import * as THREE from "three";
import Lenis from "lenis";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
const wantsRichInteraction = !prefersReducedMotion && !isCoarsePointer;

let lenis = null;

/* ------------------------------------------------------------------ */
/* Scroll progress bar                                                  */
/* ------------------------------------------------------------------ */
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  };
  document.addEventListener("scroll", update, { passive: true });
  update();
}

/* ------------------------------------------------------------------ */
/* Navbar: scroll state + mobile menu + active link                    */
/* ------------------------------------------------------------------ */
function initNav() {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const mobilePanel = document.getElementById("mobile-panel");
  const menuIconOpen = document.getElementById("toggle-icon-menu");
  const menuIconClose = document.getElementById("toggle-icon-close");

  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && mobilePanel) {
    toggle.addEventListener("click", () => {
      const isOpen = mobilePanel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      menuIconOpen.classList.toggle("hidden", isOpen);
      menuIconClose.classList.toggle("hidden", !isOpen);
      document.body.classList.toggle("overflow-hidden", isOpen);
    });

    mobilePanel.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobilePanel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      })
    );
  }

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinks.find((l) => l.getAttribute("href") === "#" + entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("nav-link--active"));
            link.classList.add("nav-link--active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }
}

/* ------------------------------------------------------------------ */
/* Scroll reveal animations                                            */
/* ------------------------------------------------------------------ */
function initReveal() {
  const items = document.querySelectorAll(".reveal, .reveal-clip");
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  document.querySelectorAll("[data-stagger]").forEach((group) => {
    group.querySelectorAll(".reveal, .reveal-clip").forEach((el, i) => {
      el.style.transitionDelay = (i % 6) * 70 + "ms";
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ */
/* 3D tilt on cards                                                     */
/* ------------------------------------------------------------------ */
function initTilt() {
  if (!wantsRichInteraction) return;
  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach((card) => {
    let frame = null;
    const strength = 10;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform = `perspective(800px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-6px)`;
      });
    };
    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", reset);
  });
}

/* ------------------------------------------------------------------ */
/* Buttery smooth scroll (Lenis) + anchor interception                  */
/* ------------------------------------------------------------------ */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  if (!wantsRichInteraction) {
    // Native scroll-behavior:smooth + scroll-mt already handles anchors.
    return;
  }

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  anchors.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -84, duration: 1.3 });
    });
  });
}

/* ------------------------------------------------------------------ */
/* Custom cursor: dot + trailing ring, morphs over interactive targets  */
/* ------------------------------------------------------------------ */
function initCustomCursor() {
  if (!wantsRichInteraction) return;

  document.documentElement.classList.add("has-custom-cursor");

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);

  let mx = -100, my = -100;
  let rx = mx, ry = my;
  let primed = false;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    if (!primed) {
      primed = true;
      dot.classList.add("is-active");
      ring.classList.add("is-active");
      rx = mx;
      ry = my;
    }
  });

  function raf() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const HOVER_SELECTOR = "a, button, .tilt-card, input, textarea, [data-cursor-hover]";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(HOVER_SELECTOR)) {
      ring.classList.add("is-hover");
      dot.classList.add("is-hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(HOVER_SELECTOR)) {
      ring.classList.remove("is-hover");
      dot.classList.remove("is-hover");
    }
  });
  document.addEventListener("mousedown", () => ring.classList.add("is-click"));
  document.addEventListener("mouseup", () => ring.classList.remove("is-click"));
  document.addEventListener("mouseleave", () => {
    dot.classList.remove("is-active");
    ring.classList.remove("is-active");
  });
}

/* ------------------------------------------------------------------ */
/* Magnetic CTA buttons                                                 */
/* ------------------------------------------------------------------ */
function initMagnetic() {
  if (!wantsRichInteraction) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const strength = 0.4;
    el.addEventListener("mouseenter", () => {
      el.style.transition = "transform 0.15s ease-out";
    });
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.55s cubic-bezier(.16,1,.3,1)";
      el.style.transform = "translate(0, 0)";
    });
  });
}

/* ------------------------------------------------------------------ */
/* Split-text word reveal (preserves inline markup, e.g. gradient spans)*/
/* ------------------------------------------------------------------ */
function wrapWordsInSpans(node, counter, gradientClass) {
  const frag = document.createDocumentFragment();
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (part === "") return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const outer = document.createElement("span");
        outer.className = "split-word";
        const inner = document.createElement("span");
        // background-clip:text only clips to an element's own direct text,
        // so a gradient-text ancestor's class must be re-applied to each
        // word span once its text is split into nested children.
        inner.className = gradientClass ? `split-word-inner ${gradientClass}` : "split-word-inner";
        inner.textContent = part;
        inner.style.transitionDelay = (counter.i % 14) * 45 + "ms";
        counter.i += 1;
        outer.appendChild(inner);
        frag.appendChild(outer);
      });
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.tagName === "BR") {
        frag.appendChild(child.cloneNode());
      } else {
        const clone = child.cloneNode(false);
        const childGradientClass = child.classList.contains("text-gradient-cyan") ? "text-gradient-cyan" : gradientClass;
        clone.appendChild(wrapWordsInSpans(child, counter, childGradientClass));
        frag.appendChild(clone);
      }
    }
  });
  return frag;
}

function initSplitText() {
  const headings = document.querySelectorAll("[data-split]");
  if (!headings.length) return;

  if (prefersReducedMotion) {
    headings.forEach((h) => h.classList.add("is-split-visible"));
    return;
  }

  headings.forEach((heading) => {
    const counter = { i: 0 };
    const frag = wrapWordsInSpans(heading, counter);
    heading.textContent = "";
    heading.appendChild(frag);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-split-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
  );
  headings.forEach((h) => observer.observe(h));
}

/* ------------------------------------------------------------------ */
/* Parallax depth layers                                                */
/* ------------------------------------------------------------------ */
function initParallax() {
  if (prefersReducedMotion) return;
  const layers = document.querySelectorAll("[data-parallax]");
  if (!layers.length) return;

  let ticking = false;
  function update() {
    const vh = window.innerHeight;
    layers.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const centerDelta = rect.top + rect.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-centerDelta * speed).toFixed(1)}px, 0)`;
    });
    ticking = false;
  }
  document.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

/* ------------------------------------------------------------------ */
/* Starfield particle dots (dark sections)                             */
/* ------------------------------------------------------------------ */
function initStarfields() {
  document.querySelectorAll(".starfield").forEach((field) => {
    const count = Number(field.dataset.count || 26);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.style.top = Math.random() * 100 + "%";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      dot.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
      const size = (1.5 + Math.random() * 2.5).toFixed(1);
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      frag.appendChild(dot);
    }
    field.appendChild(frag);
  });
}

/* ------------------------------------------------------------------ */
/* Back to top                                                         */
/* ------------------------------------------------------------------ */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  const onScroll = () => {
    btn.classList.toggle("opacity-0", window.scrollY < 700);
    btn.classList.toggle("pointer-events-none", window.scrollY < 700);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  btn.addEventListener("click", () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.3 });
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ------------------------------------------------------------------ */
/* Contact form (no backend wired yet — see comment)                   */
/* ------------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // NOTE: no form backend endpoint was supplied for this rebuild.
    // Point this at a real endpoint (Formspree, Netlify Forms, a PHP
    // mail script on the existing host, etc.) before going live.
    statusEl.textContent = "Thanks — your request has been noted. (Connect a form backend to deliver this to your inbox.)";
    statusEl.classList.remove("hidden");
    form.reset();
  });
}

/* ------------------------------------------------------------------ */
/* Footer year                                                         */
/* ------------------------------------------------------------------ */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* ------------------------------------------------------------------ */
/* Three.js hero: NH3 molecule + drifting particle field                */
/* ------------------------------------------------------------------ */
function initHeroScene() {
  const canvas = document.getElementById("hero-canvas");
  const fallback = document.getElementById("hero-fallback");
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch (err) {
    fallback?.classList.remove("hidden");
    return;
  }

  const container = canvas.parentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // ---- Lighting -------------------------------------------------
  scene.add(new THREE.AmbientLight(0x88bbff, 0.7));
  const key = new THREE.PointLight(0x6fe0ff, 14, 45, 2);
  key.position.set(6, 6, 8);
  scene.add(key);
  const rim = new THREE.PointLight(0x3a6cff, 9, 45, 2);
  rim.position.set(-7, -4, -6);
  scene.add(rim);
  const fill = new THREE.PointLight(0xffffff, 3, 30, 2);
  fill.position.set(0, -6, 10);
  scene.add(fill);

  // ---- Glow sprite helper ----------------------------------------
  function makeGlowTexture() {
    const size = 128;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(140,225,255,0.9)");
    grad.addColorStop(0.4, "rgba(80,190,255,0.35)");
    grad.addColorStop(1, "rgba(80,190,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }
  const glowTex = makeGlowTexture();

  function addGlow(parent, radius, opacity) {
    const mat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(radius, radius, 1);
    parent.add(sprite);
    return sprite;
  }

  // ---- NH3 molecule (trigonal pyramidal) --------------------------
  const molecule = new THREE.Group();

  const nMat = new THREE.MeshStandardMaterial({ color: 0x2467ff, emissive: 0x1c58ff, emissiveIntensity: 1.3, roughness: 0.2, metalness: 0.4 });
  const hMat = new THREE.MeshStandardMaterial({ color: 0xe8faff, emissive: 0x8fe0ff, emissiveIntensity: 1.05, roughness: 0.25, metalness: 0.1 });
  const bondMat = new THREE.MeshStandardMaterial({ color: 0x9fd8ff, roughness: 0.5, metalness: 0.1, transparent: true, opacity: 0.85 });

  const nGeo = new THREE.IcosahedronGeometry(1.35, 3);
  const hGeo = new THREE.IcosahedronGeometry(0.62, 2);

  addGlow(molecule, 15, 0.35);

  const nitrogen = new THREE.Mesh(nGeo, nMat);
  molecule.add(nitrogen);
  addGlow(nitrogen, 6.2, 0.75);

  const hydrogenPositions = [
    new THREE.Vector3(2.55, 1.35, 0.4),
    new THREE.Vector3(-2.3, 1.15, -1.6),
    new THREE.Vector3(0.15, 1.55, 2.35),
  ];

  hydrogenPositions.forEach((pos) => {
    const h = new THREE.Mesh(hGeo, hMat);
    h.position.copy(pos);
    molecule.add(h);
    addGlow(h, 2.4, 0.5);

    const dir = pos.clone();
    const dist = dir.length();
    const bondGeo = new THREE.CylinderGeometry(0.13, 0.16, dist, 12);
    const bond = new THREE.Mesh(bondGeo, bondMat);
    bond.position.copy(pos.clone().multiplyScalar(0.5));
    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    molecule.add(bond);
  });

  molecule.scale.setScalar(0.92);
  scene.add(molecule);

  // ---- Orbit rings (electron-path motif, echoes the atom icon) -------
  const ringGroup = new THREE.Group();
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x6fe0ff, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
  [4.6, 5.6].forEach((radius, i) => {
    const ringGeo = new THREE.TorusGeometry(radius, 0.014, 8, 96);
    const ring = new THREE.Mesh(ringGeo, ringMat.clone());
    ring.rotation.x = Math.PI / 2.4 + i * 0.6;
    ring.rotation.y = i * 1.1;
    ringGroup.add(ring);
  });
  molecule.add(ringGroup);

  // ---- Drifting particle field (frost / ice motes) -----------------
  const particleCount = 340;
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    speeds[i] = 0.15 + Math.random() * 0.35;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.055,
    map: glowTex,
    transparent: true,
    opacity: 0.55,
    color: 0xbfeeff,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ---- Pointer parallax --------------------------------------------
  const pointer = { x: 0, y: 0 };
  const targetRot = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // ---- Visibility / viewport gating for performance -----------------
  let isVisible = true;
  const io = new IntersectionObserver(([entry]) => (isVisible = entry.isIntersecting), { threshold: 0 });
  io.observe(container);
  document.addEventListener("visibilitychange", () => {
    isVisible = isVisible && !document.hidden;
  });

  resize();
  window.addEventListener("resize", resize);

  const clock = new THREE.Clock();
  let raf;

  function renderStaticFrame() {
    resize();
    renderer.render(scene, camera);
  }

  if (prefersReducedMotion) {
    renderStaticFrame();
    return;
  }

  function tick() {
    raf = requestAnimationFrame(tick);
    if (document.hidden || !isVisible) return;

    const t = clock.getElapsedTime();
    molecule.rotation.y = t * 0.22;
    molecule.rotation.x = Math.sin(t * 0.35) * 0.12;
    molecule.position.y = Math.sin(t * 0.6) * 0.35;
    ringGroup.rotation.z = t * 0.35;
    ringGroup.rotation.y = t * -0.18;

    targetRot.x += (pointer.y * 0.25 - targetRot.x) * 0.04;
    targetRot.y += (pointer.x * 0.35 - targetRot.y) * 0.04;
    camera.position.x = targetRot.y * 1.4;
    camera.position.y = -targetRot.x * 1.1;
    camera.lookAt(0, 0, 0);

    const posAttr = particleGeo.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      let y = posAttr.array[i * 3 + 1] + speeds[i] * 0.01;
      if (y > 8) y = -8;
      posAttr.array[i * 3 + 1] = y;
    }
    posAttr.needsUpdate = true;
    particles.rotation.y = t * 0.02;

    renderer.render(scene, camera);
  }
  tick();
}

/* ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initProgressBar();
  initNav();
  initSplitText();
  initReveal();
  initTilt();
  initCustomCursor();
  initMagnetic();
  initParallax();
  initStarfields();
  initBackToTop();
  initContactForm();
  initYear();
  initHeroScene();
});
