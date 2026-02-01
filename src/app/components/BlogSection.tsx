import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const blogPosts = [
  {
    title: '20 designatives',
    subtitle: 'Celebrating 20 years',
    background: 'bg-[#5B21B6]',
    textColor: 'text-white',
    displayNumber: '20',
    image: null,
  },
  {
    title: 'web summit',
    subtitle: 'Brease at WebSummit 2024',
    background: 'bg-black',
    textColor: 'text-white',
    displayNumber: null,
    image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBzdW1taXQlMjB0ZWNoJTIwY29uZmVyZW5jZSUyMGNvbG9yZnVsfGVufDF8fHx8MTc2OTkwOTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'FAXX',
    subtitle: 'Inside FOXX Season One',
    background: 'bg-black',
    textColor: 'text-white',
    displayNumber: null,
    image: 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMGNoYXJhY3RlciUyMGF2YXRhcnMlMjBuZnR8ZW58MXx8fHwxNzY5OTA5OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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

export function BlogSection() {
  const headlineWords = "Thoughts, Insights & Updates".split(" ");

  return (
    <section id="blog" className="relative py-24 bg-white">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header section */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left side - Large headline */}
          <div className="relative lg:col-span-7">
            <motion.h2
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, root: null }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[0.95]"
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
          </div>

          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, root: null }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex items-start lg:pt-8"
          >
            <p className="text-base leading-relaxed text-gray-900">
              Some light reading on the things we're exploring, building, and talking about lately.
            </p>
          </motion.div>
        </div>

        {/* Blog cards */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: null }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer relative overflow-hidden rounded-3xl ${post.background} aspect-[3/4] hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Background image if exists */}
              {post.image && (
                <div className="relative absolute inset-0">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
              )}

              {/* Large background number for first card */}
              {post.displayNumber && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.2, scale: 1 }}
                  viewport={{ once: true, root: null }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-[280px] font-bold leading-none">
                    {post.displayNumber}
                  </span>
                </motion.div>
              )}

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8">
                {/* Title at bottom */}
                <div className="mt-auto">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, root: null }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className={`text-4xl font-bold ${post.textColor} mb-2`}
                  >
                    {post.title}
                  </motion.h3>
                  {post.title === 'web summit' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, root: null }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className="inline-block mt-2"
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white">
                        <path d="M20 5L35 32.5H5L20 5Z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}