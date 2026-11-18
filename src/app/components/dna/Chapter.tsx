import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DyeText } from './DyeText';
import { Reveal } from './Reveal';

/** "VIEW MORE →" underlined text link. */
export function MoreLink({ to, href, children = 'View more', className = '' }: { to?: string; href?: string; children?: ReactNode; className?: string }) {
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
    </>
  );
  if (to) return <Link to={to} className={`dna-link ${className}`}>{inner}</Link>;
  return <a href={href} className={`dna-link ${className}`}>{inner}</a>;
}

interface ChapterHeadProps {
  index: string;
  title: string;
  lead?: string;
  link?: { to: string; label?: string };
  /** Alternate chapters start at ~42% of the width (Design DNA zig-zag). */
  offset?: boolean;
  as?: 'h1' | 'h2';
  size?: 'h1' | 'h2';
  children?: ReactNode;
}

/** Numbered chapter heading: "01." → giant dyed uppercase title → heavy lead → VIEW MORE. */
export function ChapterHead({ index, title, lead, link, offset = false, as = 'h2', size = 'h1', children }: ChapterHeadProps) {
  return (
    <div className={offset ? 'md:ml-[38%]' : ''}>
      <Reveal className="dna-index mb-6 md:mb-10">{index}.</Reveal>
      <DyeText as={as} text={title} className={`dna-${size}`} />
      {lead && (
        <Reveal delay={0.15} className="dna-lead mt-6 md:mt-10 max-w-2xl">
          {lead}
        </Reveal>
      )}
      {children}
      {link && (
        <Reveal delay={0.3} className="mt-8 md:mt-12">
          <MoreLink to={link.to}>{link.label ?? 'View more'}</MoreLink>
        </Reveal>
      )}
    </div>
  );
}
