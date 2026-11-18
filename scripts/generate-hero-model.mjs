/**
 * Generates public/models/hero.glb — the abstract sculpture used by the 3D hero.
 *
 * Run with:  npm run generate:model
 *
 * To use your own model instead, drop any .glb into public/models/ and update
 * MODEL_URL in src/app/components/hero3d/HeroModel.tsx. Nodes named "Core",
 * "HaloA", "HaloB" and "Satellites" get extra animation if present; any other
 * model still gets parallax, scroll and float motion.
 */
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Minimal FileReader polyfill: GLTFExporter uses it to build the binary buffer.
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        this.onloadend?.({ target: this });
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = `data:${blob.type};base64,${Buffer.from(buf).toString('base64')}`;
        this.onloadend?.({ target: this });
      });
    }
  };
}

const lean = (geometry) => {
  geometry.deleteAttribute('uv'); // no textures -> uvs are dead weight
  return geometry;
};

const scene = new THREE.Scene();
const root = new THREE.Group();
root.name = 'Sculpture';
scene.add(root);

// Core: glossy black lacquer knot with a faint oil-slick sheen (Design DNA: monochrome)
const coreMaterial = new THREE.MeshPhysicalMaterial({
  name: 'CoreLacquer',
  color: new THREE.Color('#0b0b0b'),
  metalness: 0.55,
  roughness: 0.14,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  iridescence: 0.3,
  iridescenceIOR: 1.5,
  iridescenceThicknessRange: [200, 500],
});
const core = new THREE.Mesh(lean(new THREE.TorusKnotGeometry(0.92, 0.3, 180, 28, 2, 3)), coreMaterial);
core.name = 'Core';
root.add(core);

// Halos: thin polished chrome rings
const chrome = new THREE.MeshStandardMaterial({
  name: 'Chrome',
  color: new THREE.Color('#f2f2f2'),
  metalness: 1,
  roughness: 0.16,
});
const haloA = new THREE.Mesh(lean(new THREE.TorusGeometry(1.75, 0.018, 8, 128)), chrome);
haloA.name = 'HaloA';
haloA.rotation.set(Math.PI / 2.4, 0.2, 0);
root.add(haloA);

const haloB = new THREE.Mesh(lean(new THREE.TorusGeometry(2.05, 0.012, 8, 140)), chrome);
haloB.name = 'HaloB';
haloB.rotation.set(-Math.PI / 3, -0.5, 0.3);
root.add(haloB);

// Satellites: small faceted gems orbiting the core
const gem = new THREE.MeshPhysicalMaterial({
  name: 'Gem',
  color: new THREE.Color('#111111'),
  metalness: 0.6,
  roughness: 0.25,
  clearcoat: 1,
});
const accent = new THREE.MeshStandardMaterial({
  name: 'Accent',
  color: new THREE.Color('#ffffff'),
  metalness: 0.9,
  roughness: 0.2,
});
const satellites = new THREE.Group();
satellites.name = 'Satellites';
const satGeo = lean(new THREE.IcosahedronGeometry(1, 0));
const sats = [
  [1.9, 0.6, 0.4, 0.11, gem],
  [-1.7, -0.8, 0.6, 0.08, accent],
  [0.4, 1.6, -0.9, 0.07, accent],
  [-0.9, 1.2, 1.2, 0.09, gem],
  [1.2, -1.4, -0.6, 0.06, accent],
];
sats.forEach(([x, y, z, s, mat], i) => {
  const m = new THREE.Mesh(satGeo, mat);
  m.name = `Satellite${i}`;
  m.position.set(x, y, z);
  m.scale.setScalar(s);
  m.rotation.set(i, i * 0.7, i * 0.3);
  satellites.add(m);
});
root.add(satellites);

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../public/models/hero.glb');
mkdirSync(dirname(out), { recursive: true });

new GLTFExporter().parse(
  scene,
  (glb) => {
    writeFileSync(out, Buffer.from(glb));
    console.log(`Wrote ${out} (${(glb.byteLength / 1024).toFixed(1)} KB)`);
  },
  (err) => {
    console.error(err);
    process.exit(1);
  },
  { binary: true }
);
