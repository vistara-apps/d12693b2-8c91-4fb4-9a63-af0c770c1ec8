'use client';

import { mockChefs } from '@/lib/mock-data';
import { ChefCard } from './ChefCard';

export function FeaturedChefs() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-text-primary">Featured Chefs</h2>
        <button className="text-sm text-accent hover:text-accent/80 transition-colors duration-200">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {mockChefs.slice(0, 3).map((chef) => (
          <ChefCard key={chef.chefId} chef={chef} variant="compact" />
        ))}
      </div>
    </section>
  );
}
