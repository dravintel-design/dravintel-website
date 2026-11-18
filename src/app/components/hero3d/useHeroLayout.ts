import { useMemo } from 'react';
import { useThree } from '@react-three/fiber';

export interface HeroLayout {
  mobile: boolean;
  /** Resting camera distance. */
  camZ: number;
  /** Model anchor in world units. */
  x: number;
  y: number;
  scale: number;
  /** How far the model rises as the hero scrolls away. */
  scrollLift: number;
  particleCount: number;
}

export const CAMERA_FOV = 35;
/** Approximate bounding radius of the sculpture at scale 1. */
const MODEL_RADIUS = 2.1;

/**
 * Responsive placement: on desktop the sculpture sits right of the headline,
 * on mobile it floats above the text, smaller, so copy stays readable.
 */
export function useHeroLayout(): HeroLayout {
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  return useMemo(() => {
    const mobile = width < 768;
    const camZ = mobile ? 9 : 7.5;
    const visH = 2 * camZ * Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180);
    const visW = visH * (width / Math.max(height, 1));

    if (mobile) {
      return {
        mobile,
        camZ,
        x: visW * 0.08,
        y: visH * 0.25,
        scale: Math.min(visW * 0.4, visH * 0.2) / MODEL_RADIUS,
        scrollLift: 1.6,
        particleCount: 180,
      };
    }

    const tablet = width < 1024;
    return {
      mobile,
      camZ,
      x: visW * (tablet ? 0.2 : 0.25),
      y: 0.2,
      scale: Math.min(visH * 0.36, visW * 0.22) / MODEL_RADIUS,
      scrollLift: 1.2,
      particleCount: tablet ? 320 : 480,
    };
  }, [width, height]);
}
