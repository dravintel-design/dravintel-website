import { motion } from 'motion/react';

import amazingAddsLogo from '@/assets/d03755cc7b39b00b11f5ea044da7636315c4e01d.png';
import sukhamHandmadeLogo from '@/assets/d631cac07dfcf52815867a921408c163494fd8d2.png';
import toysColonyLogo from '@/assets/73891f7e22291fe159354326aa56baef8c672910.png';
import rajisKitchenLogo from '@/assets/be9116520b2ca48dc31a3c6f5c69dc14263f8cdf.png';

const clients = [
  { name: 'Amazing Adds', logo: amazingAddsLogo },
  { name: 'Sukham Handmade', logo: sukhamHandmadeLogo },
  { name: 'Toys Colony', logo: toysColonyLogo },
  { name: "Raji's Kitchen", logo: rajisKitchenLogo },
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

export function ClientsSection() {
  const headlineWords = "Working with clients who push boundaries is what drives us.".split(" ");

  // Duplicate clients array for seamless loop
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="relative py-24 bg-white">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left side - Large headline */}
          <div className="relative lg:col-span-8">
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
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 flex items-start lg:pt-8"
          >
            <p className="text-base leading-relaxed text-gray-900">
              From startups to global names, each partnership inspires us to keep doing what we love.
            </p>
          </motion.div>
        </div>

        {/* Client logos - Infinite scrolling */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16 lg:gap-24"
            animate={{
              x: [0, -100 * clients.length],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center transition-all duration-300 group"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto object-contain brightness-0 group-hover:scale-125 transition-all duration-300"
                  style={{
                    filter: 'brightness(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'invert(13%) sepia(89%) saturate(4816%) hue-rotate(262deg) brightness(88%) contrast(111%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(0)';
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}