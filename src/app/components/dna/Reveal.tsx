import { motion, type HTMLMotionProps } from 'motion/react';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  /** Distance travelled in px (Design DNA: 30). */
  y?: number;
}

/** Design DNA fade-up: opacity 0 → 1, 30px rise, once, 150ms batch stagger via `delay`. */
export function Reveal({ delay = 0, y = 30, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface LettersProps {
  text: string;
  className?: string;
  /** Seconds before the first letter appears. */
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
}

/** Design DNA letter reveal: characters slide in from the left one by one (50ms stagger). */
export function Letters({ text, className, delay = 0, onMount = false }: LettersProps) {
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true } };
  return (
    <motion.span
      className={className}
      initial="hide"
      {...trigger}
      variants={{ hide: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          variants={{
            hide: { opacity: 0, x: '-0.25em' },
            show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
