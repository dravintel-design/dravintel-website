import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import logoWhite from '@/assets/dravintel-logo-white.png';

interface LoaderProps {
  onLoadingComplete: () => void;
}

/** Design DNA loader: white field, logo, hairline progress, giant counting number. */
export function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const incrementInterval = 30;
    const incrementValue = 100 / (duration / incrementInterval);
    let done: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + incrementValue;
        if (next >= 100) {
          clearInterval(interval);
          done = setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return next;
      });
    }, incrementInterval);

    return () => {
      clearInterval(interval);
      if (done) clearTimeout(done);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[var(--dv-bg)] text-white"
      role="progressbar"
      aria-label="Loading Dravintel"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.floor(progress)}
      initial={{ opacity: 1 }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      {/* Hairline progress */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-white/15">
        <div className="h-full bg-[var(--dv-accent)] transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
      </div>

      <motion.img
        src={logoWhite}
        width={399}
        height={109}
        alt="Dravintel Design"
        className="absolute left-[var(--dna-gutter)] top-8 md:top-10 h-8 md:h-10 w-auto max-w-none object-contain"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.p
        className="absolute left-[var(--dna-gutter)] bottom-8 md:bottom-12 dna-tag text-[var(--dna-muted-dark)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Elevate beyond ordinary
      </motion.p>

      <div
        className="absolute right-[var(--dna-gutter)] bottom-4 md:bottom-6 font-light leading-[0.8] tabular-nums tracking-tight text-[28vw] md:text-[18vw]"
        aria-hidden="true"
      >
        {Math.floor(progress)}
      </div>
    </motion.div>
  );
}
