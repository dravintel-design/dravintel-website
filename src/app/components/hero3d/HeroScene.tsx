import { Suspense, useEffect, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { HeroModel } from './HeroModel';
import { Particles } from './Particles';
import { CAMERA_FOV, useHeroLayout, type HeroLayout } from './useHeroLayout';
import type { HeroInput } from './heroInput';

const { damp } = THREE.MathUtils;
const LOOK_AT = new THREE.Vector3(0, 0, 0);

interface SceneProps {
  input: MutableRefObject<HeroInput>;
  onReady: () => void;
}

/** Cinematic dolly-in on load, damped pointer parallax, pull-back on scroll. */
function CameraRig({ input, layout }: { input: MutableRefObject<HeroInput>; layout: HeroLayout }) {
  useFrame(({ camera }, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 20);
    const { pointer, scroll, reducedMotion } = input.current;
    const m = reducedMotion ? 0 : 1;
    const speed = reducedMotion ? 20 : 1.6;

    camera.position.x = damp(camera.position.x, pointer.x * 0.45 * m, speed, dt);
    camera.position.y = damp(camera.position.y, pointer.y * 0.3 * m - scroll * 0.6, speed, dt);
    camera.position.z = damp(camera.position.z, layout.camZ + scroll * 2.5, speed, dt);
    camera.lookAt(LOOK_AT);
  });
  return null;
}

/** Studio light rig: warm key, lime rim, teal fill + a baked reflection environment. */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#fff4e8" />
      <spotLight position={[-5, 2, -4]} intensity={70} angle={0.6} penumbra={1} color="#acec00" />
      <pointLight position={[3, -2, 2.5]} intensity={8} color="#2fd9c8" />
      {/* Rendered once (frames=1) into a small cube map: rich reflections, ~zero per-frame cost, no HDR download */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, -2]} rotation-x={Math.PI / 2} scale={[10, 1.5, 1]} />
        <Lightformer form="rect" intensity={2} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[2, 5, 1]} />
        <Lightformer form="ring" intensity={1.5} color="#acec00" position={[0, 0, -6]} scale={4} />
      </Environment>
    </>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

function SceneContent({ input, onReady }: SceneProps) {
  const layout = useHeroLayout();
  return (
    <>
      <CameraRig input={input} layout={layout} />
      <Lighting />
      <Particles count={layout.particleCount} input={input} />
      <HeroModel input={input} layout={layout} />
      <Ready onReady={onReady} />
    </>
  );
}

interface HeroSceneProps extends SceneProps {
  /** Pauses rendering entirely when the hero is off-screen. */
  active: boolean;
}

export default function HeroScene({ input, onReady, active }: HeroSceneProps) {
  const maxDpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const [dpr, setDpr] = useState(maxDpr);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: CAMERA_FOV, position: [0, 1.5, 14], near: 0.1, far: 40 }}
      style={{ pointerEvents: 'none' }}
    >
      {/* Adaptive quality: drop resolution on slow GPUs, restore when headroom returns */}
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} flipflops={3} />
      <Suspense fallback={null}>
        <SceneContent input={input} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
