import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import dravintelLogo from '@/assets/9c35314ffaa1431c1e6596b23d44d5af343d0ba3.png';

interface LoaderProps {
  onLoadingComplete: () => void;
}

export function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds total loading time
    const incrementInterval = 30; // Update every 30ms
    const totalIncrements = duration / incrementInterval;
    const incrementValue = 100 / totalIncrements;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + incrementValue;
        if (next >= 100) {
          clearInterval(interval);
          // Wait a bit after reaching 100% before hiding
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return next;
      });
    }, incrementInterval);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with Animation */}
        <motion.div
          className="mb-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Dravintel Logo */}
          <div className="relative">
            <motion.img
              src={dravintelLogo}
              alt="Dravintel Design"
              className="h-24 w-auto"
              animate={{
                filter: [
                  "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))",
                  "drop-shadow(0 0 40px rgba(139, 92, 246, 0.8))",
                  "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Animated Circle Around Logo */}
            <motion.svg
              className="absolute -inset-12"
              viewBox="0 0 200 200"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="10 5"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Orbiting Dots */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-purple-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * 85,
                    Math.cos(((angle + 360) * Math.PI) / 180) * 85,
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * 85,
                    Math.sin(((angle + 360) * Math.PI) / 180) * 85,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mb-6">
          <div className="h-1.5 bg-purple-950/50 rounded-full overflow-hidden backdrop-blur-sm border border-purple-700/30">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="h-full w-full"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  backgroundSize: "200% 100%",
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Percentage Counter */}
        <motion.div
          className="text-6xl font-bold text-white tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {Math.floor(progress)}
          <span className="text-purple-300">%</span>
        </motion.div>
      </div>

      {/* Corner Decorative Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-purple-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-purple-500/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </motion.div>
  );
}