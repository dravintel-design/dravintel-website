import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import logoImage from '../assets/logobig.svg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
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

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Transform scroll progress to background color
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgb(255, 255, 255)", "rgb(139, 92, 246)"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)"]
  );

  const headlineWords = "Let's Create Something That Lasts".split(" ");

  return (
    <motion.footer
      ref={footerRef}
      id="contact"
      style={{ backgroundColor }}
      className="relative overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, root: null }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, root: null }}
            style={{ color: textColor }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] mb-16"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-4"
              >
                {word}
                {i === 2 && <br />}
              </motion.span>
            ))}
          </motion.h2>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: null }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                style={{ color: textColor }}
                className="text-xs uppercase tracking-wider mb-3 opacity-70"
              >
                CONTACT US
              </motion.div>
              <motion.a
                href="mailto:founder@dravintel.com"
                style={{ color: textColor }}
                className="text-lg hover:opacity-70 transition-opacity"
              >
                founder@dravintel.com
              </motion.a>
            </motion.div>

            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: null }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                style={{ color: textColor }}
                className="text-xs uppercase tracking-wider mb-3 opacity-70"
              >
                VISIT US
              </motion.div>
              <motion.div
                style={{ color: textColor }}
                className="text-lg"
              >
                Innov8, The Address<br />
                Radial Ring Road, Pallavaram, Chennai
              </motion.div>
            </motion.div>

            {/* Follow Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: null }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                style={{ color: textColor }}
                className="text-xs uppercase tracking-wider mb-3 opacity-70"
              >
                FOLLOW US
              </motion.div>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/dravintel_design?igsh=MTh0azV1dWlsamhubw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2 text-sm text-[#5B21B6] hover:bg-white/90 transition-colors uppercase tracking-wide font-medium"
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@dravintelux?si=SHiBF1NJBIc3h9Qz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2 text-sm text-[#5B21B6] hover:bg-white/90 transition-colors uppercase tracking-wide font-medium"
                >
                  YouTube
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Large Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, root: null }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <motion.img
            src={logoImage}
            alt="Dravintel"
            style={{
              filter: useTransform(
                scrollYProgress,
                [0, 0.5],
                ["brightness(0)", "brightness(0) invert(1)"]
              )
            }}
            className="w-full max-w-4xl"
          />
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, root: null }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-between text-sm"
        >
          <motion.a
            href="#privacy"
            style={{ color: textColor }}
            className="hover:opacity-70 transition-opacity underline"
          >
            Privacy Policy
          </motion.a>
          <motion.div
            style={{ color: textColor }}
            className="opacity-70"
          >
            © Dravintel Design 2026. All Rights Reserved.
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}