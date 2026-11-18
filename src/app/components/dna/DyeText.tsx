import { createElement, useRef, type ElementType, type Ref } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface DyeTextProps {
  /** Text to render. Use "\n" for a forced line break. */
  text: string;
  as?: ElementType;
  className?: string;
  /** Text colour (optional; usually inherited). */
  on?: string;
  /** Unused in the Born system (kept so existing call sites compile). */
  off?: string;
  id?: string;
}

// Motion components are created once per tag (creating them during render would remount).
const motionTags: Record<string, typeof motion.h2> = {};
function motionTag(tag: string) {
  return (motionTags[tag] ??= motion.create(tag as 'h2') as typeof motion.h2);
}

/**
 * Born-style scroll fade ("lax fadeIn"): opacity follows scroll position —
 * 0 as the heading enters the bottom of the viewport, fully opaque by 70% height.
 */
export function DyeText({ text, as = 'h2', className, on, id }: DyeTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 1', 'start 0.7'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  const lines = text.split('\n').flatMap((l, i) => (i ? [<br key={i} />, l] : [l]));
  const cls = `relative ${className ?? ''}`;

  if (reduced) {
    return createElement(as, { ref, className: cls, id, style: on ? { color: on } : undefined }, lines);
  }
  const Tag = motionTag(typeof as === 'string' ? as : 'h2');
  return (
    <Tag ref={ref as Ref<HTMLHeadingElement>} id={id} className={cls} style={{ opacity, y, ...(on ? { color: on } : {}) }}>
      {lines}
    </Tag>
  );
}
