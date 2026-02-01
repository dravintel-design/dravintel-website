import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const projects = [
  {
    title: 'Digital Banking Platform',
    category: 'Web Design & Development',
    description: 'A comprehensive banking experience with intuitive UI and seamless transactions.',
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY5ODE2ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UI/UX', 'Development', 'FinTech'],
  },
  {
    title: 'Luxury Brand Identity',
    category: 'Brand Identity Design',
    description: 'Sophisticated brand system for a premium lifestyle company.',
    image: 'https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwbG9nb3xlbnwxfHx8fDE3Njk5MDkyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Branding', 'Identity', 'Print'],
  },
  {
    title: 'Fitness Tracking App',
    category: 'Mobile App Design',
    description: 'Award-winning health and fitness app with personalized coaching.',
    image: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzY5ODA3MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Mobile', 'React Native', 'Health'],
  },
  {
    title: 'Animated Product Launch',
    category: '3D & Motion Design',
    description: 'Eye-catching 3D animations for a global product reveal campaign.',
    image: 'https://images.unsplash.com/photo-1740174459682-4dd3f72e2512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMG1vdGlvbiUyMGdyYXBoaWNzJTIwYW5pbWF0aW9ufGVufDF8fHx8MTc2OTkwOTIwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['3D', 'Motion', 'Animation'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
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

export function WorkSection() {
  const headlineWords = "Selected Works".split(" ");

  return (
    <section id="work" className="relative py-24 bg-gray-50">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, root: null }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, root: null }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-700 leading-relaxed"
          >
            Selected projects that showcase our expertise and creativity
          </motion.p>
        </div>

        <div className="relative space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: null }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                index % 2 === 0 ? '' : 'lg:direction-rtl'
              }`}
            >
              {/* Image */}
              <div className={`lg:col-span-7 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                <div className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-96 lg:h-[500px] overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-5 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, root: null }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-3 text-sm font-medium text-gray-500 uppercase tracking-wide"
                >
                  {project.category}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, root: null }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 hover:font-black transition-all cursor-pointer"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, root: null }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg text-gray-600 mb-6"
                >
                  {project.description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, root: null }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, root: null }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="inline-flex items-center gap-2 text-black font-medium hover:gap-4 transition-all cursor-pointer"
                >
                  View Project
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, root: null }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-4 text-lg text-black hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all"
          >
            View All Projects
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}