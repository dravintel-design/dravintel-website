import { motion } from 'motion/react';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-white">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header section */}
        <div className="relative mb-20">
          <div className="relative pb-16 border-b border-gray-200">
            {/* Main headline - left side */}
            {/* Main headline - left side - Staggered Character Animation */}
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1] mb-12 flex flex-wrap gap-x-[0.2em] gap-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.03
                  }
                }
              }}
            >
              {"Helping businesses stand out, not blend in".split(" ").map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            damping: 12,
                            stiffness: 100
                          }
                        }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Add a non-breaking space after words unless it's the last word (handled by flex gap, but ensuring space for copy/paste if needed, though flex gap handles visual) */}
                </span>
              ))}
            </motion.h2>

            {/* Description - two columns below headline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl ml-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: null }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="text-base leading-relaxed text-gray-900">
                  Each project reflects the strategy, craft, and attention to detail we bring from the first sketch to the final release. Nothing is rushed. Everything is intentional.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: null }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-base leading-relaxed text-gray-900">
                  These aren't just deliverables; they're the result of late-night thinking, tight feedback loops, and a belief that great design should never blend in.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Services list */}
        <div className="relative space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: null }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border-t border-gray-200 py-12 first:border-t-0 hover:bg-gray-50/50 transition-colors duration-300"
            >
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                {/* Left side - Number and Title */}
                <div className="relative lg:col-span-7">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, root: null }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    className="text-sm text-gray-500 mb-3"
                  >
                    {service.number}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, root: null }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight group-hover:font-black transition-all"
                  >
                    {service.title}
                  </motion.h3>
                </div>

                {/* Right side - Description */}
                <div className="lg:col-span-5 flex items-start lg:pt-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, root: null }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="text-lg leading-relaxed text-gray-800"
                  >
                    {service.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}