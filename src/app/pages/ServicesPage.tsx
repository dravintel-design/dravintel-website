import { useDocumentTitle } from '@/app/components/dna/useDocumentTitle';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PageHero } from '@/app/components/dna/PageHero';
import { DyeText } from '@/app/components/dna/DyeText';
import { Reveal } from '@/app/components/dna/Reveal';

const approaches = [
  {
    title: 'Discovery & Strategy',
    description: 'Understanding your brand, audience, and goals to build a clear foundation for the work ahead.',
  },
  {
    title: 'Concept & Design',
    description: 'Shaping insights into strong visual ideas and cohesive identity systems.',
  },
  {
    title: 'Development & Delivery',
    description: 'Turning design into seamless digital experiences supported by clean, high-performance code.',
  },
  {
    title: 'Iteration & Refinement',
    description: 'Reviewing, polishing, and elevating every detail to ensure the final result feels intentional and complete.',
  },
];

const faqs = [
  {
    question: 'How does your design and development process work from start to finish?',
    answer: 'We begin with discovery to understand your brand and goals, move into concept and design to create visual solutions, develop the digital experience with clean code, and refine every detail before launch.',
  },
  {
    question: 'What is included in a complete website project (design + development)?',
    answer: 'A complete website project includes strategy and planning, custom design, responsive development, content integration, testing across devices, and deployment with documentation.',
  },
  {
    question: 'What is included in a full logo and brand identity project?',
    answer: 'Brand identity projects include discovery, logo design, color palette, typography system, brand guidelines, and application across various touchpoints like business cards and social media.',
  },
  {
    question: 'How long do branding and web design projects usually take?',
    answer: 'Branding projects typically take 4-6 weeks, while website projects range from 6-12 weeks depending on complexity and scope. Timelines are discussed during the initial consultation.',
  },
  {
    question: 'Can you hand over designs to our internal development or design team?',
    answer: 'Yes, we can provide complete design files, documentation, and asset libraries in formats that work seamlessly with your internal team.',
  },
  {
    question: 'How does maintenance or updates work after a website is launched?',
    answer: 'We offer ongoing maintenance packages that include updates, security monitoring, content changes, and technical support to keep your site running smoothly.',
  },
  {
    question: 'Do you build backend systems and more complex technical solutions?',
    answer: 'Yes, we develop custom backend systems, APIs, databases, and complex web applications tailored to your specific business needs.',
  },
];

export function ServicesPage() {
  useDocumentTitle('Services');

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="relative bg-[var(--dv-bg)]">
      <PageHero video="clouds" lines={['Design That', 'Builds Brands']}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-[3vw]">
          <p className="lg:col-span-4 lg:col-start-6 dna-lead">
            Great design is more than aesthetics. It is strategy, clarity, storytelling, and experience working in unison.
          </p>
          <p className="lg:col-span-3 dna-body">
            We turn ideas into meaningful brand identities, digital experiences, and visual narratives that leave a lasting impression.
          </p>
        </div>
      </PageHero>

      {/* 01. Our approach */}
      <section className="dna-section !pt-[4vw] dna-gutter">
        <div className="md:ml-[38%]">
          <DyeText text={'Our\nApproach'} className="dna-h1" />
          <Reveal delay={0.15} className="dna-lead mt-8 md:mt-10 max-w-xl">
            Design is a process. We work collaboratively, exploring, testing, and iterating to create work that balances form and function.
          </Reveal>
        </div>

        <div className="mt-[12vw] md:mt-[8vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-[2.5vw]">
          {approaches.map((approach, index) => (
            <Reveal key={approach.title} delay={index * 0.15} className="dv-card h-full p-6 md:p-8">
              <h3 className="dna-h3 mb-4">{approach.title}</h3>
              <p className="dna-body text-[var(--dna-gray-800)]">{approach.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 02. FAQs */}
      <section className="dv-panel dna-section dna-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-[4vw]">
          <div className="lg:col-span-4">
            <DyeText text="FAQ's" className="dna-h1" off="#8a8a8a" />
          </div>

          <ul className="lg:col-span-7 lg:col-start-6 border-t border-[var(--dna-gray-300)]">
            {faqs.map((faq, index) => {
              const open = openFaqIndex === index;
              return (
                <li key={index} className="border-b border-[var(--dna-gray-300)]">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                  >
                    <span className="flex gap-5">
                      <span className="dna-index !text-[15px] !font-semibold text-[var(--dna-gray-600)] pt-1">{String(index + 1).padStart(2, '0')}.</span>
                      <span className="text-[1.0625rem] font-medium leading-relaxed tracking-[0.02em]">{faq.question}</span>
                    </span>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4 }} className="shrink-0 mt-1">
                      <Plus className="h-5 w-5" strokeWidth={1.25} />
                    </motion.span>
                  </button>
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    aria-hidden={!open}
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="dna-body text-[var(--dna-gray-800)] pb-8 pl-10 pr-8 max-w-[65ch]">{faq.answer}</p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
