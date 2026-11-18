import { Link } from 'react-router-dom';
import { CornerDownRight } from 'lucide-react';
import { Reveal } from '@/app/components/dna/Reveal';

/**
 * TODO(content): these are PLACEHOLDERS. Replace each quote and author with a real,
 * approved client testimonial before going live — do not publish invented quotes.
 */
const testimonials = [
  {
    quote: 'Placeholder — add a client quote about how the new UX improved their conversion or engagement.',
    author: 'Client name, Role — Company',
  },
  {
    quote: 'Placeholder — add a client quote about the working process: clarity, communication, and delivery on time.',
    author: 'Client name, Role — Company',
  },
  {
    quote: 'Placeholder — add a client quote about a measurable result, e.g. a KPI reached after launch.',
    author: 'Client name, Role — Company',
  },
  {
    quote: 'Placeholder — add a client quote about the brand or product experience Dravintel designed.',
    author: 'Client name, Role — Company',
  },
];

/**
 * SAI-style testimonials: left heading + lead with an outline pill on the right, then a
 * horizontal row of dark 20px-rounded cards — large italic quote on top, author at the bottom.
 * Native scroll-snap row, so touch, trackpad and keyboard all work.
 */
export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="relative dna-section overflow-hidden">
      <div className="dna-container dna-gutter">
        <Reveal>
          <h2 id="testimonials-title" className="dna-h2 max-w-[40ch]">
            Hear it from the <span className="sai-hl">people we&apos;ve built with</span>.
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.1}>
            <p className="dna-lead max-w-[56ch]">
              From clearer journeys to measurable growth, here&apos;s what working with Dravintel has meant for our clients.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="shrink-0">
            <Link to="/contact" className="dna-btn">
              <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Start a project
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="dna-container mt-12 md:mt-16">
        <ul
          aria-label="Client testimonials"
          className="sai-track dna-gutter flex gap-6 md:gap-[60px] overflow-x-auto scroll-px-[var(--dna-gutter)] pb-2"
        >
          {testimonials.map((t, i) => (
            <li key={i} className="w-[84vw] shrink-0 sm:w-[400px]">
              <Reveal delay={0.08 * i} className="flex h-full">
              <figure className="flex min-h-[420px] w-full flex-col justify-between rounded-[20px] bg-[var(--sai-surface)] p-8 md:min-h-[450px] md:p-9">
                <blockquote className="text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] italic leading-[1.5] text-white">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 text-[16px] font-medium text-white">{t.author}</figcaption>
              </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
