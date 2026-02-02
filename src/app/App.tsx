import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Loader } from '@/app/components/Loader';
import { GooeyMouse } from '@/app/components/GooeyMouse';
import { HomePage } from '@/app/pages/HomePage';
import { ServicesPage } from '@/app/pages/ServicesPage';
import { WorkPage } from '@/app/pages/WorkPage';
import { AboutPage } from '@/app/pages/AboutPage';
import { ContactPage } from '@/app/pages/ContactPage';
import { ScrollToTop } from '@/app/components/ScrollToTop';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';

    // Apply to all elements
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-white relative">
          <GooeyMouse />
          <Header />
          <main className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}