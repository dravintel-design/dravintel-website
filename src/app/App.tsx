import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Toaster } from '@/app/components/ui/sonner';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Loader } from '@/app/components/Loader';
import { SmoothScroll, scrollToTarget, setScrollLocked } from '@/app/components/dna/SmoothScroll';
import { HomePage } from '@/app/pages/HomePage';
import { ServicesPage } from '@/app/pages/ServicesPage';
import { WorkPage } from '@/app/pages/WorkPage';
import { AboutPage } from '@/app/pages/AboutPage';
import { ContactPage } from '@/app/pages/ContactPage';

/** Born-style page change: quick fade out, scroll reset, gentle fade in. */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => scrollToTarget(0, true)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } }}
        exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
      >
        <main className="relative">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

/** Intro loader only on the first visit of a session, and never with reduced motion (avoids a 3s LCP delay). */
function shouldShowLoader() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (sessionStorage.getItem('dv-intro-seen')) return false;
    sessionStorage.setItem('dv-intro-seen', '1');
  } catch {
    /* storage unavailable — show the loader */
  }
  return true;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(shouldShowLoader);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Prevent scrolling while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'unset';
    setScrollLocked(isLoading);
    return () => {
      document.body.style.overflow = 'unset';
      setScrollLocked(false);
    };
  }, [isLoading]);

  return (
    <MotionConfig reducedMotion="user">
    <Router>
      <SmoothScroll />
      <AnimatePresence mode="wait">
        {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-[var(--sai-bg)] relative">
          <Header />
          <AnimatedRoutes />
          <Toaster theme="dark" position="bottom-center" richColors={false} />
        </div>
      )}
    </Router>
    </MotionConfig>
  );
}
