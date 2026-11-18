import { Link } from 'react-router-dom';
import { Bot, Code2, CornerDownRight, Factory, Layers, MousePointerClick, Users, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/app/components/dna/Reveal';

const icons: Record<string, LucideIcon> = {
  'UX UI Design': MousePointerClick,
  'Product Design': Layers,
  'Industrial Design': Factory,
  'Web Development': Code2,
  'AI Automation': Bot,
  'Business Workshops': Users,
};

const services = [
  {
    number: '01',
    title: 'UX UI Design',
    description: 'We study behavior, interpret signals, and design journeys that guide action effortlessly',
  },
  {
    number: '02',
    title: 'Product Design',
    description: 'We build products where user value and business strategy are deliberately aligned.',
  },
  {
    number: '03',
    title: 'Industrial Design',
    description: 'We combine behavioral insight with engineering precision to design physical products that perform.',
  },
  {
    number: '04',
    title: 'Web Development',
    description: 'Converting design intent into pixel-precise, high-performance code built to scale.',
  },
  {
    number: '05',
    title: 'AI Automation',
    description: 'Automating complex workflows with machine learning to deliver responsive, intelligent experiences.',
  },
  {
    number: '06',
    title: 'Business Workshops',
    description: 'Strategy workshops designed to align teams, define value, and establish long-term direction.',
  },
];

/**
 * SAI "Services": heading left with a lime highlight and an outline pill right, then tall
 * rounded cards with a hairline lime border — number top-left, line icon, title, description.
 */
export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative dna-section overflow-hidden">
      <div aria-hidden="true" className="sai-glow right-[-10%] bottom-[-10%] h-[520px] w-[720px]" />
      <div className="dna-container dna-gutter relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[44rem]">
            <Reveal>
              <h2 id="services-title" className="dna-h2">
                Helping businesses <span className="sai-hl">stand out</span>, not blend in.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="dna-lead mt-5">
                Each project reflects the strategy, craft, and attention to detail we bring from the first sketch to the final release. Nothing is rushed. Everything is intentional.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="shrink-0">
            <Link to="/services" className="dna-btn">
              <CornerDownRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Explore all services
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 md:mt-16 grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.title];
            return (
              <li key={s.title}>
                <Reveal delay={(i % 3) * 0.1} className="h-full">
                  <Link to="/services" className="sai-card group flex h-full min-h-[340px] md:min-h-[400px] flex-col p-6 md:p-8">
                    <span className="dna-index" aria-hidden="true">{s.number}</span>
                    <div className="mt-auto pt-16">
                      {Icon && <Icon className="h-9 w-9 text-[var(--sai-accent)]" strokeWidth={1.25} aria-hidden="true" />}
                      <h3 className="dna-h3 mt-5">{s.title}</h3>
                      <p className="dna-body mt-3">{s.description}</p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
