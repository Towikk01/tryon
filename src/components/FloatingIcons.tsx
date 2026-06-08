"use client";

import { useEffect, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadImageShape } from "@tsparticles/shape-image";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

async function init(engine: Engine) {
  await loadSlim(engine);
  await loadImageShape(engine);
}

// Gentle gym props (dumbbell + water bottle SVGs) drifting and slowly
// tumbling across the background. Tasteful, low-opacity, non-interactive.
const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: { value: 13 },
    shape: {
      type: "image",
      options: {
        image: [
          { src: "/particles/dumbbell.svg", width: 64, height: 64 },
          { src: "/particles/bottle.svg", width: 64, height: 64 },
        ],
      },
    },
    opacity: { value: { min: 0.22, max: 0.48 } },
    size: { value: { min: 14, max: 30 } },
    move: {
      enable: true,
      speed: { min: 0.25, max: 0.9 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    rotate: {
      value: { min: 0, max: 360 },
      direction: "random",
      animation: { enable: true, speed: 4, sync: false },
    },
    wobble: {
      enable: true,
      distance: 8,
      speed: { min: -3, max: 3 },
    },
  },
  interactivity: {
    events: { onHover: { enable: false }, onClick: { enable: false } },
  },
};

export function FloatingIcons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="fitflow-particles"
        options={options}
        className="pointer-events-none fixed inset-x-0 bottom-0 top-20 -z-10"
      />
    </ParticlesProvider>
  );
}
