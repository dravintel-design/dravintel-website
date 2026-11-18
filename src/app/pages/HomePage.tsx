import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDocumentTitle } from '@/app/components/dna/useDocumentTitle';
import { scrollToTarget } from '@/app/components/dna/SmoothScroll';
import { HeroSection } from '@/app/components/HeroSection';
import { WorkSection } from '@/app/components/WorkSection';
import { ServicesSection } from '@/app/components/ServicesSection';
import { ProcessSection } from '@/app/components/ProcessSection';
import { ClientsSection } from '@/app/components/ClientsSection';
import { TestimonialsSection } from '@/app/components/TestimonialsSection';
import { BlogSection } from '@/app/components/BlogSection';
import { CultureSection } from '@/app/components/CultureSection';

export function HomePage() {
  useDocumentTitle();
  const { hash } = useLocation();

  // Support links like /#blog from the header
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollToTarget(hash), 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <ClientsSection />
      <TestimonialsSection />
      <BlogSection />
      <CultureSection />
    </>
  );
}
