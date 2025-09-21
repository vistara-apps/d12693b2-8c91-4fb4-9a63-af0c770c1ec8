'use client';

import { mockExperiences } from '@/lib/mock-data';
import { ExperienceCard } from './ExperienceCard';

export function PopularExperiences() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-text-primary">Popular Experiences</h2>
        <button className="text-sm text-accent hover:text-accent/80 transition-colors duration-200">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {mockExperiences.slice(0, 4).map((experience) => (
          <ExperienceCard key={experience.experienceId} experience={experience} variant="preview" />
        ))}
      </div>
    </section>
  );
}
