import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function GooeyMouse() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');

    window.addEventListener('mousemove', mouseMove);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [role="button"], .cursor-pointer'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.6,
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Subtle glass cursor */}
      <motion.div
        className="absolute w-5 h-5 rounded-full backdrop-blur-sm bg-white/10 border border-white/30 shadow-sm"
        style={{
          boxShadow: '0 4px 16px 0 rgba(139, 92, 246, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.05)',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 600,
          damping: 30,
          mass: 0.3,
        }}
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        {/* Subtle shine effect */}
        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white/40 blur-[1px]" />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-purple-600/80"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 50,
          mass: 0.1,
        }}
      />
    </div>
  );
}