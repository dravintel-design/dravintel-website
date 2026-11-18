import { motion } from 'motion/react';
import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CornerDownRight } from 'lucide-react';
import { useHeroInput } from '@/app/components/hero3d/heroInput';
import { VideoBg } from '@/app/components/dna/VideoBg';
import { scrollToTarget } from '@/app/components/dna/SmoothScroll';

/**
 * SAI-style hero: full-viewport navy stage, uppercase gradient headline left, lime primary
 * pill, live studio clock and a round scroll cue. Background: the monochrome looping cliff
 * video, tinted navy. Set HERO_3D = true to swap in the Three.js sculpture instead.
 */
const HERO_3D = false;
const HeroScene = lazy(() => import('@/app/components/hero3d/HeroScene'));

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Live Chennai time with seconds (SAI's office clock in the hero). */
function useStudioClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [webgl] = useState(() => HERO_3D && supportsWebGL());
  const [sceneReady, setSceneReady] = useState(false);
  const [active, setActive] = useState(true);
  const input = useHeroInput(sectionRef);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const time = useStudioClock();

  // Stop rendering WebGL once the hero has scrolled out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--sai-bg)] text-white">
      {webgl ? (
        <div aria-hidden="true" className={`absolute inset-0 -z-10 transition-opacity duration-[1500ms] ease-out ${sceneReady ? 'opacity-100' : 'opacity-0'}`}>
          <SceneErrorBoundary fallback={<VideoBg name="cliff" priority active={active} className="opacity-50" />}>
            <Suspense fallback={null}>
              <HeroScene input={input} onReady={handleSceneReady} active={active} />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      ) : (
        <>
          <VideoBg name="cliff" priority active={active} className="-z-10" />
          {/* Navy tint ties the greyscale footage into the brand palette */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--sai-bg)]/45 mix-blend-multiply" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_40%,rgba(172,236,0,0.10),transparent_60%)]" />
        </>
      )}
      {/* Keep the copy side legible over the sculpture */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--sai-bg)]/90 via-[var(--sai-bg)]/55 to-[var(--sai-bg)]/10" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[var(--sai-bg)]/80 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[var(--sai-bg)] to-transparent" />

      <div className="dna-container dna-gutter relative flex min-h-[100svh] flex-col pt-[112px] md:pt-[132px] pb-24">
        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1">
          <p className="inline-flex items-center gap-2.5 text-[15px] text-white/90" aria-label={`Chennai studio time ${time}`}>
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--sai-accent)] shadow-[0_0_12px_var(--sai-accent)]" />
          <span aria-hidden="true">Chennai</span>
          <span aria-hidden="true" className="tabular-nums">{time}</span>
          </p>
        </div>

        <div className="my-auto max-w-[1200px] py-10">
          <motion.h1
            className="dna-display max-w-[20ch]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            We design digital experiences that turn attention into revenue
          </motion.h1>
          <motion.p
            className="dna-lead mt-6 max-w-[46ch] !text-white/80"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease }}
          >
            We help ambitious businesses turn complexity into clarity, and clarity into measurable growth through UX-led design.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
          >
            <Link to="/contact" className="dna-cta">
              <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Work with us
            </Link>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToTarget('#work')}
        aria-label="Scroll to our work"
        className="absolute bottom-8 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-white/90 text-white transition-colors hover:border-[var(--sai-accent)] hover:bg-[var(--sai-accent)] hover:text-[var(--sai-accent-ink)]"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </section>
  );
}
