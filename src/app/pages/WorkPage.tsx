import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const projects = [
  {
    title: 'ACOE',
    description: 'Refined Japanese hospitality branding rooted in the philosophy of kintsugi.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTczODQyNzIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['BRANDING', 'UI/UX', 'WEB DESIGN', 'DEVELOPMENT', 'MOTION DESIGN'],
  },
  {
    title: 'Nesa',
    description: 'Where decentralized AI meets visual complexity.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYWklMjBjaGlwfGVufDF8fHx8MTczODQyNzIwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['LOGO & BRANDING', 'WEB DESIGN', 'DEVELOPMENT', '3D ART', 'UI/UX', 'MOTION GRAPHICS'],
  },
  {
    title: 'Quantum Finance',
    description: 'Next-generation banking platform with AI-powered insights.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Mzg0MjcyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['UI/UX', 'WEB DESIGN', 'DEVELOPMENT', 'BRANDING', 'MOTION DESIGN'],
  },
  {
    title: 'EcoVerse',
    description: 'Sustainable living marketplace connecting conscious consumers.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBzdXN0YWluYWJsZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzM4NDI3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['BRANDING', 'WEB DESIGN', 'UI/UX', 'DEVELOPMENT', '3D ART'],
  },
  {
    title: 'Pulse Athletics',
    description: 'Performance-driven fitness brand for the modern athlete.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYXRobGV0aWN8ZW58MXx8fHwxNzM4NDI3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['BRANDING', 'MOTION GRAPHICS', 'WEB DESIGN', 'UI/UX', 'DEVELOPMENT'],
  },
];

export function WorkPage() {
  return (
    <div className="relative bg-white pt-20">
      {/* Hero Section */}
      <div className="relative py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Large Heading - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-[0.95] mb-8">
                Unforgettable Work<br />
                Distinctly Ours
              </h1>
            </motion.div>

            {/* Description Text - Right Side in Two Columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex items-end"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm lg:text-base text-black leading-relaxed">
                <p>
                  Each project reflects the strategy, craft, and attention to detail we bring from the first sketch to the final release. Nothing is rushed. Everything is intentional.
                </p>
                <p>
                  These aren't just deliverables; they're the result of late-night thinking, tight feedback loops, and a belief that great design should never blend in.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Projects Grid - Alternating Layout */}
      <div className="relative">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-32 last:mb-0"
            >
              <div className={`relative mx-auto ${isEven ? 'max-w-7xl px-6 lg:px-8' : 'max-w-7xl px-6 lg:px-8'}`}>
                <div className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative lg:col-span-7 ${!isEven ? 'lg:col-start-6' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`relative lg:col-span-5 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className={`${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}
                    >
                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 hover:font-black transition-all cursor-pointer">
                        {project.title}
                      </h2>
                      <p className="text-lg sm:text-xl text-gray-800 mb-8 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-black uppercase tracking-wide hover:bg-[#8B5CF6] hover:text-white transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA Section */}
      <div className="relative py-32 bg-gray-50">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Let's create something extraordinary together
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-4 text-lg font-medium text-black hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}