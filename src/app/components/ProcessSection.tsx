import { motion } from 'motion/react';

const processSteps = [
  {
    number: '01',
    title: 'Research & Strategy',
    description: 'Deep dive into user needs, business goals, and market opportunities. Define the problem before solutions.',
  },
  {
    number: '02',
    title: 'Design & Prototype',
    description: 'Create high-fidelity designs and interactive prototypes. Test early and often to validate assumptions.',
  },
  {
    number: '03',
    title: 'Launch & Iterate',
    description: 'Ship fast, learn faster. Monitor real usage and iterate continuously.',
  },
];

export function ProcessSection() {
  const headlineWords = "A journey of a thousand miles begins with a single step".split(" ");

  return (
    <section id="process" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Animated Headline */}
        <div className="relative mb-20">
          <motion.h2 
            className="text-4xl lg:text-6xl xl:text-7xl font-bold text-black mb-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-3 lg:mr-4"
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Step Number */}
              <motion.div
                className="mb-6 relative"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15 + 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-[#8B5CF6] text-7xl lg:text-8xl font-bold opacity-20">
                  {step.number}
                </span>
              </motion.div>

              {/* Step Title */}
              <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-700 text-lg leading-relaxed">
                {step.description}
              </p>

              {/* Animated Line Connector (except for last item on desktop) */}
              {index < processSteps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-12 left-full w-16 lg:w-24 h-0.5 bg-gradient-to-r from-[#8B5CF6] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15 + 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#8B5CF6] opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#8B5CF6] opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </section>
  );
}