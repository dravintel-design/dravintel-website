import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FreeAuditModal } from '@/app/components/FreeAuditModal';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave parameters
    let time = 0;
    const waves: Array<{
      amplitude: number;
      frequency: number;
      speed: number;
      offset: number;
      color: string;
      opacity: number;
    }> = [
      { amplitude: 80, frequency: 0.002, speed: 0.02, offset: 0, color: '#8B5CF6', opacity: 0.3 },
      { amplitude: 60, frequency: 0.003, speed: 0.015, offset: 100, color: '#7C3AED', opacity: 0.25 },
      { amplitude: 50, frequency: 0.0025, speed: 0.018, offset: 200, color: '#6D28D9', opacity: 0.22 },
      { amplitude: 70, frequency: 0.0028, speed: 0.012, offset: 300, color: '#5B21B6', opacity: 0.18 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        // Create wavy path
        for (let x = 0; x <= canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5) * (wave.amplitude * 0.5);

          ctx.lineTo(x, y);
        }

        // Complete the path to create filled wave
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        // Apply gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `${wave.color}${Math.floor(wave.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${wave.color}00`);

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      time += 0.5;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gray-100 pt-20">
      {/* WebGL-style Animated Waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 w-full relative z-10">
        <div className="max-w-3xl">
          {/* Large headline */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[0.9]">
              Elevate,<br />
              Beyond the Ordinary.
            </h1>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-gray-800 max-w-md leading-relaxed">
              We're a design and technology studio in Chennai, creating work that moves brands from good to unforgettable.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Secondary Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-black px-6 py-3 text-sm font-medium tracking-wide text-black hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all"
            >
              Let's start free
            </button>
            
            {/* Primary Purple Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B5CF6] border-2 border-[#8B5CF6] px-6 py-3 text-sm font-medium tracking-wide text-white hover:bg-[#5B21B6] hover:border-[#5B21B6] transition-all"
            >
              Start project
            </Link>
          </div>
        </div>
      </div>

      {/* Free Audit Modal */}
      <FreeAuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => {
          const nextSection = document.querySelector('#services');
          nextSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-wider text-gray-600">SCROLL</span>
          <ChevronDown className="h-6 w-6 text-gray-800" />
        </div>
      </motion.div>
    </section>
  );
}