import { motion } from 'motion/react';
import { Sparkles, Plus } from 'lucide-react';
import { useState } from 'react';

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="relative bg-white pt-20">
      {/* Section 1: Design That Builds Brands */}
      <div className="relative py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Decorative sparkle icon */}
          <div className="absolute top-0 right-6 lg:right-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="rounded-lg bg-yellow-400 p-2"
            >
              <Sparkles className="h-6 w-6 text-black" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left - Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[0.9]">
                Design That Builds Brands
              </h2>
            </motion.div>

            {/* Right - Two columns of text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pt-12"
            >
              <div>
                <p className="text-base leading-relaxed text-black font-medium">
                  Great design is more than aesthetics. It is strategy, clarity, storytelling, and experience working in unison.
                </p>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-gray-800">
                  We turn ideas into meaningful brand identities, digital experiences, and visual narratives that leave a lasting impression.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Our Approach */}
      <div className="relative py-24 lg:py-32 bg-gray-50">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Our Approach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[0.9] mb-8">
                Our Approach
              </h2>
              <p className="text-base leading-relaxed text-gray-700">
                Design is a process. We work collaboratively, exploring, testing, and iterating to create work that balances form and function.
              </p>
            </motion.div>

            {/* Right - 2x2 Grid of Approach items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {approaches.map((approach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="border-t-2 border-black pt-6"
                >
                  <h3 className="text-xl font-bold text-black mb-4 leading-tight">
                    {approach.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {approach.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 3: FAQs */}
      <div className="relative py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - FAQ Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[0.9]">
                FAQ's
              </h2>
            </motion.div>

            {/* Right - FAQ List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="border-b border-gray-200 pb-6"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-start justify-between gap-4 text-left group"
                  >
                    <span className="text-base font-medium text-black leading-relaxed group-hover:font-bold transition-all">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <Plus className="h-5 w-5 text-black" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaqIndex === index ? 'auto' : 0,
                      opacity: openFaqIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm leading-relaxed text-gray-700 mt-4 pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}