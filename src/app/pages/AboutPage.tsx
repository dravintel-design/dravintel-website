import { motion } from 'motion/react';

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

export function AboutPage() {
  return (
    <div className="relative bg-white pt-20">
      {/* Hero Section - Turning Thought Into Something Real */}
      <div className="relative py-24 lg:py-32 bg-[#F5F5F5]">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-tight mb-16">
              Turning Thought<br />
              Into Something Real
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
          >
            <div className="text-base lg:text-lg text-black leading-relaxed">
              <p>
                We're a team of designers, developers, and thinkers who care deeply about craft and clarity.
              </p>
            </div>
            <div className="text-base lg:text-lg text-black leading-relaxed">
              <p>
                Working from Chennai, we build brands with bold ideas, striking visuals, and seamless digital experiences.
              </p>
            </div>
            <div className="text-base lg:text-lg text-black leading-relaxed">
              <p>
                We experiment, refine, and build work that stands out for its intention, quality, and personality.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="relative py-24 lg:py-32 bg-white">
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-12">
              Who We Are
            </h2>
            
            <div className="text-xl sm:text-2xl lg:text-3xl text-black leading-relaxed space-y-6">
              <p>
                <span className="bg-[#8B5CF6] text-white px-2 py-1">Dravintel Design</span> is a design and technology studio built on a simple idea.
              </p>
              <p>
                <span className="bg-[#8B5CF6] text-white px-2 py-1">Good work matters.</span> We care about clarity, craft, and the details that shape,{' '}
                <span className="bg-[#8B5CF6] text-white px-2 py-1">how people experience a brand.</span>
              </p>
              <p className="mt-8">
                We work with startups and established companies, who value,{' '}
                <span className="bg-[#8B5CF6] text-white px-2 py-1">thoughtful design</span> and honest execution.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How We Work Section */}
      <div className="relative py-24 lg:py-32 bg-[#F5F5F5]">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Side - Heading and Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-8">
                How we<br />work
              </h2>
              <p className="text-base text-black leading-relaxed max-w-md">
                We believe great work is the result of clarity, intention, and a willingness to explore. Every project begins with understanding, grows through collaboration, and evolves through thoughtful iteration. Our approach blends strategy, design, and technology with precision, and a drive to do things the right way, not the easy way. This is how we build work that stands up to time and delivers real impact.
              </p>
            </motion.div>

            {/* Right Side - Principle Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column - Cards 1 and 3 */}
                <div className="space-y-6 lg:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-white rounded-3xl border-2 border-black p-8"
                  >
                    <div className="text-sm font-medium text-gray-600 mb-4">
                      {principles[0].number}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 leading-tight">
                      {principles[0].title}
                    </h3>
                    <p className="text-base text-black leading-relaxed">
                      {principles[0].description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative bg-white rounded-3xl border-2 border-black p-8"
                  >
                    <div className="text-sm font-medium text-gray-600 mb-4">
                      {principles[2].number}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 leading-tight">
                      {principles[2].title}
                    </h3>
                    <p className="text-base text-black leading-relaxed">
                      {principles[2].description}
                    </p>
                  </motion.div>
                </div>

                {/* Right Column - Card 2 centered */}
                <div className="space-y-6 lg:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative bg-white rounded-3xl border-2 border-black p-8"
                  >
                    <div className="text-sm font-medium text-gray-600 mb-4">
                      {principles[1].number}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 leading-tight">
                      {principles[1].title}
                    </h3>
                    <p className="text-base text-black leading-relaxed">
                      {principles[1].description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="relative bg-white rounded-3xl border-2 border-black p-8"
                  >
                    <div className="text-sm font-medium text-gray-600 mb-4">
                      {principles[3].number}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 leading-tight">
                      {principles[3].title}
                    </h3>
                    <p className="text-base text-black leading-relaxed">
                      {principles[3].description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Always Pushing Forward Section */}
      <div className="relative min-h-screen flex items-center bg-black py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Large Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[1.1]">
                Always<br />
                pushing<br />
                forward
              </h2>
            </motion.div>

            {/* Two Column Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg lg:text-xl text-white leading-relaxed">
                <p className="font-bold">
                  We believe progress comes from curiosity and a willingness to try something new. Every project is an opportunity to refine our craft and explore what could be better.
                </p>
                <p>
                  We stay open, stay hungry, and look for ideas that move us forward. When something has potential, we bring it to life with clarity and care, shaping it into work that feels meaningful.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative py-32 bg-white">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Ready to bring your vision to life?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-4 text-lg font-medium text-black hover:bg-black hover:text-white transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}