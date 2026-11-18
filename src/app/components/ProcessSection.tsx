import { Link } from 'react-router-dom';
import { CornerDownRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Reveal } from '@/app/components/dna/Reveal';

const processSteps = [
  {
    number: '01',
    title: 'Research & Strategy',
    description: 'Deep dive into user needs, business goals, and market opportunities. Define the problem before solutions.',
  },
  {
    number: '02',
    title: 'Design & Prototype',
    description: 'Create high-fidelity designs and interactive prototypes. Test early and often to validate assumptions.',
  },
  {
    number: '03',
    title: 'Launch & Iterate',
    description: 'Ship fast, learn faster. Monitor real usage and iterate continuously.',
  },
];

/**
 * SAI "SmartCX" band: an oversized gradient wordmark drifting behind a centred heading,
 * supporting copy, three glowing step cards and a lime primary pill.
 */
export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={ref} id="process" aria-labelledby="process-title" className="relative dna-section overflow-hidden">
      <div aria-hidden="true" className="sai-glow left-1/2 top-[38%] h-[560px] w-[900px] -translate-x-1/2" />
      <motion.p
        aria-hidden="true"
        style={reduced ? undefined : { x }}
        className="dna-display pointer-events-none select-none whitespace-nowrap text-center !text-[clamp(4.5rem,2rem+12vw,13rem)] !leading-none opacity-90"
      >
        Our Process
      </motion.p>

      <div className="dna-container dna-gutter relative mt-6 md:mt-10 text-center">
        <Reveal>
          <h2 id="process-title" className="dna-h2 mx-auto max-w-[30ch]">
            A journey of a thousand miles <span className="sai-hl">begins with a single step.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="dna-lead mx-auto mt-5 max-w-[58ch]">
            Design is a process. We work collaboratively, exploring, testing, and iterating to create work that balances form and function.
          </p>
        </Reveal>

        <ol className="mt-12 md:mt-16 grid gap-6 md:gap-8 md:grid-cols-3 text-left">
          {processSteps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 0.12} className="h-full">
                <div className="h-full rounded-[20px] border border-[var(--sai-line)] bg-[rgba(10,39,64,0.7)] p-6 md:p-8 backdrop-blur-sm">
                  <h3 className="dna-h3">{step.title}</h3>
                  <p className="dna-body mt-4">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-12">
          <Link to="/contact" className="dna-cta">
            <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Start a project
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
