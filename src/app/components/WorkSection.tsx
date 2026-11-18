import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CornerDownRight } from 'lucide-react';
import { Reveal } from '@/app/components/dna/Reveal';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const projects = [
  {
    title: 'Digital Banking Platform',
    category: 'Web Design & Development',
    description: 'A comprehensive banking experience with intuitive UI and seamless transactions.',
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY5ODE2ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Luxury Brand Identity',
    category: 'Brand Identity Design',
    description: 'Sophisticated brand system for a premium lifestyle company.',
    image: 'https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwbG9nb3xlbnwxfHx8fDE3Njk5MDkyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Fitness Tracking App',
    category: 'Mobile App Design',
    description: 'Award-winning health and fitness app with personalized coaching.',
    image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzY5ODA3MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Animated Product Launch',
    category: '3D & Motion Design',
    description: 'Eye-catching 3D animations for a global product reveal campaign.',
    image: 'https://images.unsplash.com/photo-1740174459682-4dd3f72e2512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMG1vdGlvbiUyMGdyYXBoaWNzJTIwYW5pbWF0aW9ufGVufDF8fHx8MTc2OTkwOTIwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'EcoVerse',
    category: 'Marketplace Design',
    description: 'Sustainable living marketplace connecting conscious consumers.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzM4NDI3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const SPEED = 26; // px per second — slow drift
const MIN_OPACITY = 0.28; // right-most card

/**
 * SAI "Case Studies": centred heading, then a slow right-to-left loop showing five cards.
 * Each card's opacity follows its position — 100% at the left edge, fading towards the right —
 * so cards brighten as they travel left. Eases to a stop on hover/focus so cards can be read
 * and clicked; stays still (opacity gradient kept) for prefers-reduced-motion.
 */
export function WorkSection() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const holding = useRef(false);

  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(tr.children) as HTMLElement[];
    const half = items.length / 2;
    let vpWidth = 0;
    let setWidth = 0;
    let lefts: number[] = [];
    const measure = () => {
      vpWidth = vp.clientWidth;
      lefts = items.map((el) => el.offsetLeft);
      setWidth = lefts[half] - lefts[0];
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);

    let inView = true;
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
    io.observe(vp);

    let offset = 0;
    let speed = reduced ? 0 : SPEED;
    let last = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!inView) return;
      const target = reduced || holding.current ? 0 : SPEED;
      speed += (target - speed) * Math.min(1, dt * 4); // ease in/out of the drift
      offset += speed * dt;
      if (setWidth > 0) offset = ((offset % setWidth) + setWidth) % setWidth;
      tr.style.transform = `translate3d(${-offset}px,0,0)`;
      for (let i = 0; i < items.length; i++) {
        const x = lefts[i] - lefts[0] - offset; // card's left edge inside the viewport
        const t = Math.min(1, Math.max(0, x / vpWidth));
        items[i].style.opacity = (1 - (1 - MIN_OPACITY) * t).toFixed(3);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const hold = (v: boolean) => () => (holding.current = v);
  const cards = [...projects, ...projects]; // second set makes the loop seamless

  return (
    <section id="work" aria-labelledby="work-title" className="relative dna-section overflow-hidden">
      <div aria-hidden="true" className="sai-glow sai-glow--teal left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2" />
      <div className="dna-container dna-gutter relative text-center">
        <Reveal>
          <h2 id="work-title" className="dna-h2">
            <span className="sai-hl">Unforgettable work</span>, distinctly ours.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="dna-lead mx-auto mt-5 max-w-[52ch]">
            Selected projects that showcase our expertise and creativity.
          </p>
        </Reveal>
      </div>

      <div className="dna-container dna-gutter relative mt-12 md:mt-16">
        <div
          ref={viewport}
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000)]"
          onPointerEnter={hold(true)}
          onPointerLeave={hold(false)}
          onFocus={hold(true)}
          onBlur={hold(false)}
        >
          <ul ref={track} aria-label="Case studies" className="flex gap-4 md:gap-6 will-change-transform">
            {cards.map((project, i) => {
              const clone = i >= projects.length;
              return (
                <li
                  key={`${project.title}-${i}`}
                  aria-hidden={clone || undefined}
                  className="w-[68%] shrink-0 sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-6rem)/5)]"
                >
                  <Link
                    to="/work"
                    tabIndex={clone ? -1 : undefined}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-[24px] md:rounded-[28px] bg-[var(--sai-surface)]"
                  >
                    <ImageWithFallback src={project.image} alt="" className="dna-img absolute inset-0 h-full w-full object-cover" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(0,18,36,0.94)] via-[rgba(0,18,36,0.3)] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-left">
                      <p className="text-[13px] font-medium text-[var(--sai-accent)]">{project.category}</p>
                      <h3 className="mt-1.5 text-[1.125rem] md:text-[1.25rem] font-medium leading-snug text-white">{project.title}</h3>
                      <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-white/80">{project.description}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="dna-container dna-gutter mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link to="/work" className="dna-btn">
          <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          All case studies
        </Link>
      </div>
    </section>
  );
}
