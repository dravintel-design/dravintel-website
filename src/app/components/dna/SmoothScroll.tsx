import { useEffect } from 'react';
import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Expo-out: fast start, long soft landing — the "buttery" feel. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Smoothly scroll to a selector/element/position, falling back to native scrolling. */
export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset: 0, duration: 1.6, easing: easeOutExpo, force: true });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function setScrollLocked(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/**
 * Site-wide inertial smooth scrolling (Lenis).
 * Wheel/trackpad input is eased; touch keeps the device's native momentum (already smooth and
 * expected on phones). Uses the real window scroll position, so Motion's useScroll/whileInView,
 * IntersectionObservers and sticky elements keep working. Off for prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const instance = new Lenis({
      duration: 1.25,
      easing: easeOutExpo,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: { offset: 0, duration: 1.6, easing: easeOutExpo },
      // Let Radix dialogs/sheets and anything marked data-lenis-prevent scroll natively
      prevent: (node) => !!node.closest?.('[role="dialog"], [data-radix-scroll-area-viewport]'),
    });
    lenis = instance;
    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
