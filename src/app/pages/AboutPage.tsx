import { useDocumentTitle } from '@/app/components/dna/useDocumentTitle';
import { Link } from 'react-router-dom';
import { PageHero } from '@/app/components/dna/PageHero';
import { DyeText } from '@/app/components/dna/DyeText';
import { Reveal } from '@/app/components/dna/Reveal';

const principles = [
  {
    number: '1',
    title: 'Collaboration first',
    description: 'A team of passionate minds who challenge, refine, and build together.',
  },
  {
    number: '2',
    title: 'Design with conviction',
    description: 'We make clear decisions, trust our instincts, and create work with purpose.',
  },
  {
    number: '3',
    title: 'Experimenting with intention',
    description: 'We explore, test, and iterate to keep our thinking sharp and our work evolving.',
  },
  {
    number: '4',
    title: 'Trust the process',
    description: 'From early exploration to final delivery, each step is handled with care, clarity, and focus.',
  },
];

/** Lime highlight (emphasis words). */
function Mark({ children }: { children: React.ReactNode }) {
  return <span className="dv-hl font-medium">{children}</span>;
}

export function AboutPage() {
  useDocumentTitle('About');

  return (
    <div className="relative bg-[var(--dv-bg)]">
      <PageHero video="road" lines={['Turning Thought', 'Into Something', 'Real']}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-[3vw] dna-body">
          <p className="lg:col-span-3 lg:col-start-4">
            We're a team of designers, developers, and thinkers who care deeply about craft and clarity.
          </p>
          <p className="lg:col-span-3">
            Working from Chennai, we build brands with bold ideas, striking visuals, and seamless digital experiences.
          </p>
          <p className="lg:col-span-3">
            We experiment, refine, and build work that stands out for its intention, quality, and personality.
          </p>
        </div>
      </PageHero>

      {/* 01. Who we are — offset chapter */}
      <section className="dna-section dna-gutter">
        <div className="md:ml-[38%]">
          <DyeText text={'Who\nWe Are'} className="dna-h1" />
          <Reveal delay={0.15} className="mt-10 md:mt-14 space-y-6 text-[clamp(1.25rem,2vw,1.875rem)] leading-[1.6] text-[var(--dv-head)]">
            <p>
              <Mark>Dravintel Design</Mark> is a design and technology studio built on a simple idea.
            </p>
            <p>
              <Mark>Good work matters.</Mark> We care about clarity, craft, and the details that shape,{' '}
              <Mark>how people experience a brand.</Mark>
            </p>
            <p>
              We work with startups and established companies, who value, <Mark>thoughtful design</Mark> and honest execution.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02. How we work */}
      <section className="dna-section !pt-0 dna-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-[4vw]">
          <div className="lg:col-span-5">
            <DyeText text={'How we\nwork'} className="dna-h1" />
            <Reveal delay={0.15} className="dna-body mt-10 max-w-md text-[var(--dna-gray-800)]">
              We believe great work is the result of clarity, intention, and a willingness to explore. Every project begins with understanding, grows through collaboration, and evolves through thoughtful iteration. Our approach blends strategy, design, and technology with precision, and a drive to do things the right way, not the easy way. This is how we build work that stands up to time and delivers real impact.
            </Reveal>
          </div>

          <ul className="lg:col-span-6 lg:col-start-7 border-t border-[var(--dna-gray-200)] self-end">
            {principles.map((p, index) => (
              <li key={p.number} className="border-b border-[var(--dna-gray-200)]">
                <Reveal delay={index * 0.1} className="grid grid-cols-12 gap-4 py-8 md:py-10">
                  <span className="col-span-2 dna-index !text-[15px] !font-semibold text-[var(--dna-gray-600)]">0{p.number}.</span>
                  <div className="col-span-10">
                    <h3 className="dna-h3 mb-3">{p.title}</h3>
                    <p className="dna-body text-[var(--dna-gray-800)]">{p.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03. Always pushing forward — inverted */}
      <section className="bg-[var(--dna-ink)] text-white dna-section dna-gutter">
        <DyeText text={'Always\npushing\nforward'} className="dna-display" on="#ffffff" off="#7a7a7a" />
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-[3vw]">
          <Reveal className="lg:col-span-4 lg:col-start-6 dna-lead">
            We believe progress comes from curiosity and a willingness to try something new. Every project is an opportunity to refine our craft and explore what could be better.
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3 dna-body">
            We stay open, stay hungry, and look for ideas that move us forward. When something has potential, we bring it to life with clarity and care, shaping it into work that feels meaningful.
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="dna-section dna-gutter">
        <DyeText text={"Let's Build Something\nTogether"} className="dna-h2" />
        <Reveal delay={0.15} className="mt-8 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
          <p className="dna-lead">Ready to bring your vision to life?</p>
          <Link to="/contact" className="dna-cta self-start">
            Get in Touch
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
