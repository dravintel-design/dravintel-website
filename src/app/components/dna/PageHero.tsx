import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { VideoBg, type VideoName } from '@/app/components/dna/VideoBg';

interface PageHeroProps {
  /** Title lines, joined into one statement. */
  lines: string[];
  children?: ReactNode;
  tone?: 'dark' | 'light';
  /** Monochrome background video, shown on the right behind a navy fade. */
  video?: VideoName;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Page hero: navy stage, uppercase gradient title, supporting copy, lime glow + video. */
export function PageHero({ lines, children, video }: PageHeroProps) {
  return (
    <header className="relative isolate overflow-hidden bg-[var(--dv-bg)] text-white">
      {video && (
        <>
          <VideoBg name={video} priority className="-z-10 opacity-55" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--dv-bg)] via-[var(--dv-bg)]/80 to-[var(--dv-bg)]/20" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[var(--dv-bg)] to-transparent" />
        </>
      )}
      <div aria-hidden="true" className="dv-glow -z-10 left-[-10%] top-[20%] h-[480px] w-[640px]" />

      <div className="dna-container dna-gutter flex min-h-[78svh] flex-col pt-[120px] md:pt-[140px] pb-[var(--dna-pad)]">
        <div className="mt-auto pt-12">
          <motion.h1
            className="dna-display max-w-[18ch]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            {lines.join(' ')}
          </motion.h1>
          {children && (
            <motion.div
              className="mt-8 md:mt-12 text-[var(--dv-body)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
