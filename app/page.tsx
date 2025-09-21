import { AppShell } from '@/components/AppShell';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedChefs } from '@/components/FeaturedChefs';
import { PopularExperiences } from '@/components/PopularExperiences';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <HeroSection />
        <FeaturedChefs />
        <PopularExperiences />
      </div>
    </AppShell>
  );
}
