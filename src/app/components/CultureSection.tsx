import { Link } from 'react-router-dom';
import { CornerDownRight } from 'lucide-react';
import { Reveal } from '@/app/components/dna/Reveal';
import { VideoBg } from '@/app/components/dna/VideoBg';

/**
 * Statement and two pills (solid white + outline) over a full-bleed
 * looping monochrome video, tinted navy so the copy stays legible.
 */
export function CultureSection() {
  return (
    <section aria-labelledby="culture-title" className="relative isolate overflow-hidden">
      <VideoBg name="clouds" className="-z-10" />
      {/* Navy tint + left-weighted fade for legibility; top/bottom fades blend into neighbours */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--dv-bg)]/45 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--dv-bg)]/90 via-[var(--dv-bg)]/60 to-[var(--dv-bg)]/20" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[var(--dv-bg)] to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[var(--dv-bg)] to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_50%,rgba(172,236,0,0.08),transparent_60%)]" />

      <div className="dna-container dna-gutter flex min-h-[80svh] items-center py-[var(--dna-pad)]">
        <div className="max-w-[640px]">
          <Reveal>
            <h2 id="culture-title" className="dna-h2 max-w-[24ch]">
              Always pushing forward. We believe progress comes from <span className="dv-hl">curiosity</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="dna-lead mt-6 max-w-[50ch] !text-white/85">
              Every project is an opportunity to refine our craft and explore what could be better. We stay open, stay hungry, and look for ideas that move us forward.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-4">
            <Link to="/about" className="dna-btn dna-btn--white">
              <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              About Us
            </Link>
            <Link to="/contact" className="dna-btn">
              <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Contact
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
