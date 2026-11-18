import { useEffect, useRef } from 'react';

/**
 * Mutable input state read inside the render loop (useFrame).
 * Stored in a ref so pointer/scroll events never trigger React re-renders.
 */
export interface HeroInput {
  /** Pointer position normalised to -1..1 (x right, y up). */
  pointer: { x: number; y: number };
  /** 0 when hero is fully in view, 1 when it has scrolled fully out. */
  scroll: number;
  reducedMotion: boolean;
}

export function useHeroInput(sectionRef: React.RefObject<HTMLElement>) {
  const input = useRef<HeroInput>({
    pointer: { x: 0, y: 0 },
    scroll: 0,
    reducedMotion: false,
  });

  useEffect(() => {
    const state = input.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.reducedMotion = motionQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => (state.reducedMotion = e.matches);

    const onPointerMove = (e: PointerEvent) => {
      state.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      state.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const h = el.offsetHeight || window.innerHeight;
      const top = el.getBoundingClientRect().top;
      state.scroll = Math.min(1, Math.max(0, -top / h));
    };

    onScroll();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    motionQuery.addEventListener('change', onMotionChange);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, [sectionRef]);

  return input;
}
