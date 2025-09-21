'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedChefs } from '@/components/FeaturedChefs';
import { PopularExperiences } from '@/components/PopularExperiences';
import { AuthModal } from '@/components/AuthModal';
import { User } from '@/lib/types';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (from localStorage or session)
    const savedUser = localStorage.getItem('forkd_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('forkd_user');
      }
    }
  }, []);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('forkd_user', JSON.stringify(authenticatedUser));
    setShowAuth(false);
  };

  const handleAuthRequired = () => {
    setShowAuth(true);
  };

  return (
    <AppShell onAuthRequired={handleAuthRequired}>
      <div className="space-y-8">
        <HeroSection user={user} onAuthClick={() => setShowAuth(true)} />
        <FeaturedChefs />
        <PopularExperiences />
      </div>

      {showAuth && (
        <AuthModal
          onAuthSuccess={handleAuthSuccess}
          onClose={() => setShowAuth(false)}
        />
      )}
    </AppShell>
  );
}
