import { HeroSection } from '@/app/components/HeroSection';
import { ServicesSection } from '@/app/components/ServicesSection';
import { ProcessSection } from '@/app/components/ProcessSection';
import { ClientsSection } from '@/app/components/ClientsSection';
import { WorkSection } from '@/app/components/WorkSection';
import { BlogSection } from '@/app/components/BlogSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ClientsSection />
      <WorkSection />
      <BlogSection />
    </>
  );
}