import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { HeroInput } from './heroInput';
import type { HeroLayout } from './useHeroLayout';

/** Swap this for your own .glb in /public/models to change the hero object. */
export const MODEL_URL = `${import.meta.env.BASE_URL}models/hero.glb`;

const { damp } = THREE.MathUtils;

interface Props {
  input: MutableRefObject<HeroInput>;
  layout: HeroLayout;
}

export function HeroModel({ input, layout }: Props) {
  // No Draco/Meshopt: the model is uncompressed, so skip loading decoders entirely.
  const { scene } = useGLTF(MODEL_URL, false, false);
  const group = useRef<THREE.Group>(null);

  // Named parts get bespoke motion; a custom model without them still works.
  const parts = useMemo(
    () => ({
      core: scene.getObjectByName('Core'),
      haloA: scene.getObjectByName('HaloA'),
      haloB: scene.getObjectByName('HaloB'),
      satellites: scene.getObjectByName('Satellites'),
    }),
    [scene]
  );

  useFrame((state, rawDelta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(rawDelta, 1 / 20); // avoid jumps after tab switches
    const t = state.clock.elapsedTime;
    const { pointer, scroll, reducedMotion } = input.current;
    const m = reducedMotion ? 0 : 1;

    // Position: layout anchor + gentle float + pointer drift + scroll lift
    g.position.x = damp(g.position.x, layout.x + pointer.x * 0.12 * m, 3, dt);
    g.position.y = damp(
      g.position.y,
      layout.y + Math.sin(t * 0.8) * 0.08 * m + pointer.y * 0.08 * m + scroll * layout.scrollLift,
      3,
      dt
    );

    // Rotation: tilt toward pointer, spin with scroll
    g.rotation.y = damp(g.rotation.y, pointer.x * 0.35 * m + scroll * Math.PI * 0.9, 2.5, dt);
    g.rotation.x = damp(g.rotation.x, -pointer.y * 0.22 * m + scroll * 0.5, 2.5, dt);

    // Scale: eases in from 0 on load (intro), shrinks slightly as hero scrolls away
    const targetScale = layout.scale * (1 - scroll * 0.25);
    g.scale.setScalar(damp(g.scale.x, targetScale, reducedMotion ? 20 : 2.2, dt));

    // Part animation
    const { core, haloA, haloB, satellites } = parts;
    if (core) {
      core.rotation.y += dt * 0.22 * m;
      core.rotation.z += dt * 0.08 * m;
    }
    if (haloA) {
      haloA.rotation.z += dt * 0.3 * m;
      haloA.scale.setScalar(damp(haloA.scale.x, 1 + scroll * 0.35, 3, dt));
    }
    if (haloB) {
      haloB.rotation.z -= dt * 0.2 * m;
      haloB.scale.setScalar(damp(haloB.scale.x, 1 + scroll * 0.6, 3, dt));
    }
    if (satellites) {
      satellites.rotation.y += dt * (0.15 + scroll * 0.6) * m;
    }
  });

  return (
    <group ref={group} scale={0.001}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL, false, false);
