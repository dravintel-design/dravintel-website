import { ArrowUpRight, CornerDownRight } from 'lucide-react';
import { Reveal } from '@/app/components/dna/Reveal';

/** Dravintel's own Substack articles (cover images saved locally in public/insights). */
const blogPosts = [
  {
    title: 'What even is UX anymore?',
    subtitle: 'This question will change your perspective',
    href: 'https://substack.com/home/post/p-208802533',
    date: 'July 28, 2026',
    image: '/insights/what-even-is-ux-anymore.jpg',
  },
  {
    title: 'Why UX Designers Should Avoid Horizontal Tabs on Product Pages',
    subtitle:
      'Baymard’s large-scale product page research consistently shows that horizontal tab layouts cause users to miss critical product information, even when they are actively looking for it.',
    href: 'https://substack.com/home/post/p-206255080',
    date: 'July 9, 2026',
    image: '/insights/avoid-horizontal-tabs.jpg',
  },
  {
    title: 'From Pixel Pusher to System Architect',
    subtitle: 'The design.md workflow that makes AI follow your rules, not its defaults',
    href: 'https://substack.com/home/post/p-210854070',
    date: 'August 12, 2026',
    image: '/insights/pixel-pusher-to-system-architect.jpg',
  },
];

/**
 * SAI "Insights": a large rounded surface panel — heading + outline pill, then article rows
 * (title and date left, summary right). Each row links to the Substack article.
 */
export function BlogSection() {
  return (
    <section id="blog" aria-labelledby="insights-title" className="relative py-[calc(var(--dna-section)*0.5)]">
      <div className="sai-panel min-[1480px]:mx-auto min-[1480px]:max-w-[1440px]">
        <div className="dna-gutter py-[calc(var(--dna-section)*0.75)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal>
                <h2 id="insights-title" className="dna-h2">
                  Thoughts, <span className="sai-hl">insights</span> &amp; updates.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="dna-lead mt-4 max-w-[46ch]">
                  Some light reading on the things we're exploring, building, and talking about lately.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="shrink-0">
              <a href="https://dravinteldesign1.substack.com" target="_blank" rel="noopener noreferrer" className="dna-btn">
                <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                View all insights
                <span className="sr-only"> (opens Substack in a new tab)</span>
              </a>
            </Reveal>
          </div>

          <ul className="mt-10 md:mt-14">
            {blogPosts.map((post, index) => (
              <li key={post.href} className="border-t border-[var(--sai-line)] first:border-t-0">
                <Reveal delay={index * 0.08}>
                  <article className="group relative grid gap-6 py-10 md:py-14 lg:grid-cols-12 lg:gap-10">
                    <div className="flex gap-5 lg:col-span-6">
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="hidden sm:block h-20 w-32 shrink-0 rounded-xl object-cover md:h-24 md:w-40"
                      />
                      <div>
                        <h3 className="text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] font-medium leading-snug text-[var(--sai-head)] transition-colors group-hover:text-[var(--sai-accent)]">
                          <a href={post.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                            {post.title}
                            <span className="sr-only"> (opens Substack in a new tab)</span>
                          </a>
                        </h3>
                        <p className="mt-3 text-[13px] text-[var(--sai-muted)]">{post.date}</p>
                      </div>
                    </div>
                    <div className="self-center lg:col-span-5 lg:col-start-8">
                      <p className="dna-body line-clamp-3">{post.subtitle}</p>
                      <p aria-hidden="true" className="dna-link mt-4">
                        Read on Substack <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
