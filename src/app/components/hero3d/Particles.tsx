import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { HeroInput } from './heroInput';

const WRAP = 6; // particles wrap vertically within [-WRAP, WRAP]

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  uniform float uSize;
  attribute float aSeed;
  attribute float aSize;
  varying float vAlpha;
  varying float vMix;

  void main() {
    vec3 p = position;
    // Slow upward drift + scroll push, wrapped so the field never empties
    float y = p.y + uTime * 0.06 * (0.4 + aSeed) + uScroll * 3.0;
    p.y = mod(y + ${WRAP.toFixed(1)}, ${(WRAP * 2).toFixed(1)}) - ${WRAP.toFixed(1)};
    p.x += sin(uTime * 0.3 + aSeed * 6.2831) * 0.15;
    p.z += cos(uTime * 0.25 + aSeed * 6.2831) * 0.15;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aSize * uPixelRatio / -mv.z;

    // Twinkle + fade near wrap edges to hide the pop
    float edge = smoothstep(-${WRAP.toFixed(1)}, -${(WRAP - 1.5).toFixed(1)}, p.y)
               * (1.0 - smoothstep(${(WRAP - 1.5).toFixed(1)}, ${WRAP.toFixed(1)}, p.y));
    float twinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aSeed) + aSeed * 40.0);
    vAlpha = (0.25 + 0.75 * fract(aSeed * 7.13)) * edge * twinkle;
    vMix = fract(aSeed * 3.71);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vMix;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.6);
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

interface Props {
  count: number;
  input: MutableRefObject<HeroInput>;
}

/** Soft drifting light dust (on the charcoal hero), a single draw call. */
export function Particles({ count, input }: Props) {
  const points = useRef<THREE.Points>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * WRAP * 2;
      positions[i * 3 + 2] = -5 + Math.random() * 8;
      seeds[i] = Math.random();
      sizes[i] = 0.4 + Math.pow(Math.random(), 3) * 1.6; // mostly small, a few larger
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uPixelRatio: { value: 1 },
          uSize: { value: 60 },
          uOpacity: { value: 0.6 },
          uColorA: { value: new THREE.Color('#ffffff') },
          uColorB: { value: new THREE.Color('#acec00') },
        },
      }),
    []
  );

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 20);
    const { pointer, scroll, reducedMotion } = input.current;
    const u = material.uniforms;
    if (!reducedMotion) u.uTime.value += dt;
    u.uScroll.value = THREE.MathUtils.damp(u.uScroll.value, scroll, 4, dt);
    u.uPixelRatio.value = dpr;

    // Counter-parallax: the dust shifts against the pointer for depth
    const p = points.current;
    if (p && !reducedMotion) {
      p.rotation.y = THREE.MathUtils.damp(p.rotation.y, -pointer.x * 0.06, 2, dt);
      p.rotation.x = THREE.MathUtils.damp(p.rotation.x, pointer.y * 0.04, 2, dt);
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
