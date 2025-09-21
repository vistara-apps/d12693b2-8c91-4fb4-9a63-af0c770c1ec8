'use client';

import { Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export function HeroSection() {
  return (
    <section className="text-center space-y-6 py-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-text-primary">
          Discover Culinary
          <span className="text-primary block">Experiences</span>
        </h1>
        <p className="text-base leading-7 text-text-secondary max-w-md mx-auto">
          Connect with local chefs for personalized cooking classes and exclusive dining events.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input
            type="text"
            placeholder="Search cuisines, chefs, or experiences..."
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {['Italian', 'Japanese', 'French', 'Mexican', 'Thai'].map((cuisine) => (
            <button
              key={cuisine}
              className="px-3 py-1 text-sm bg-surface/50 text-text-secondary rounded-full hover:bg-surface hover:text-text-primary transition-colors duration-200"
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
