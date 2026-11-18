import { useDocumentTitle } from '@/app/components/dna/useDocumentTitle';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PageHero } from '@/app/components/dna/PageHero';
import { DyeText } from '@/app/components/dna/DyeText';
import { Reveal } from '@/app/components/dna/Reveal';
import { scrollToTarget } from '@/app/components/dna/SmoothScroll';

const projects = [
  {
    title: 'ACOE',
    description: 'Refined Japanese hospitality branding rooted in the philosophy of kintsugi.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTczODQyNzIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Branding', 'UI/UX', 'Web design', 'Development', 'Motion design'],
  },
  {
    title: 'Nesa',
    description: 'Where decentralized AI meets visual complexity.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYWklMjBjaGlwfGVufDF8fHx8MTczODQyNzIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Logo & branding', 'Web design', 'Development', '3D art', 'UI/UX', 'Motion graphics'],
  },
  {
    title: 'Quantum Finance',
    description: 'Next-generation banking platform with AI-powered insights.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Mzg0MjcyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['UI/UX', 'Web design', 'Development', 'Branding', 'Motion design'],
  },
  {
    title: 'EcoVerse',
    description: 'Sustainable living marketplace connecting conscious consumers.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzM4NDI3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Branding', 'Web design', 'UI/UX', 'Development', '3D art'],
  },
  {
    title: 'Pulse Athletics',
    description: 'Performance-driven fitness brand for the modern athlete.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0aWN8ZW58MXx8fHwxNzM4NDI3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Branding', 'Motion graphics', 'Web design', 'UI/UX', 'Development'],
  },
];

export function WorkPage() {
  useDocumentTitle('Work');

  return (
    <div className="relative bg-[var(--dv-bg)]">
      <PageHero video="cliff" lines={['Unforgettable work,', 'distinctly ours']}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-[3vw] dna-body">
          <p className="lg:col-span-4 lg:col-start-6">
            Each project reflects the strategy, craft, and attention to detail we bring from the first sketch to the final release. Nothing is rushed. Everything is intentional.
          </p>
          <p className="lg:col-span-3">
            These aren't just deliverables; they're the result of late-night thinking, tight feedback loops, and a belief that great design should never blend in.
          </p>
        </div>
      </PageHero>

      {/* Index list — hovering a row floats the project image beside the cursor */}
      <section className="dna-gutter pb-[10vw]">
        <ul className="border-t border-[var(--dna-gray-200)]">
          {projects.map((project, index) => (
            <li key={project.title} className="border-b border-[var(--dna-gray-200)]">
              <Reveal delay={index * 0.08}>
                <a
                  href={`#project-${index + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(`#project-${index + 1}`);
                  }}
                  data-cursor-image={project.image}
                  className="group grid grid-cols-12 items-baseline gap-4 py-6 md:py-8"
                >
                  <span className="col-span-2 lg:col-span-1 dna-index !text-[15px] !font-semibold text-[var(--dna-gray-600)]">{String(index + 1).padStart(2, '0')}.</span>
                  <span className="col-span-10 lg:col-span-6 dna-h2 transition-transform duration-500 group-hover:translate-x-[1vw]" style={{ transitionTimingFunction: 'var(--dna-ease)' }}>
                    {project.title}
                  </span>
                  <span className="hidden md:block lg:col-span-5 dna-overline text-[var(--dna-gray-600)] text-right leading-relaxed">
                    {project.tags.slice(0, 3).join(' / ')}
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Case studies — zig-zag */}
      <section className="space-y-[18vw] md:space-y-[12vw] pb-[12vw]">
        {projects.map((project, index) => {
          const flip = index % 2 === 1;
          return (
            <article id={`project-${index + 1}`} key={project.title} className="dna-gutter grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-[3vw] items-end scroll-mt-28">
              <Reveal className={`lg:col-span-7 ${flip ? 'lg:col-start-6 lg:order-2' : ''}`}>
                <div className="group aspect-[4/3] overflow-hidden rounded-[28px] md:rounded-[40px] bg-[var(--dna-gray-50)]">
                  <ImageWithFallback src={project.image} alt={project.title} className="dna-img h-full w-full object-cover" />
                </div>
              </Reveal>

              <div className={`lg:col-span-4 ${flip ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-9'}`}>
                <DyeText text={project.title} as="h2" className="dna-h2" />
                <Reveal delay={0.15} className="dna-lead mt-6">
                  {project.description}
                </Reveal>
                {/* Plain text, not pills — pills look like buttons but these are not interactive */}
                <Reveal delay={0.25} className="dna-overline !leading-[1.9] text-[var(--dna-gray-600)] mt-8 whitespace-normal">
                  {project.tags.join(' / ')}
                </Reveal>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA */}
      <section className="dv-panel dna-section dna-gutter mb-[var(--dna-section)]">
        <DyeText text={'Ready to Start\nYour Project?'} className="dna-h1" off="#8a8a8a" />
        <Reveal delay={0.15} className="mt-8 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          <p className="dna-lead">Let's create something extraordinary together</p>
          <Link to="/contact" className="dna-cta self-start">
            Get in Touch
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
