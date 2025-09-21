'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface AppShellProps {
  children: React.ReactNode;
  onAuthRequired?: () => void;
}

export function AppShell({ children, onAuthRequired }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <Header
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onAuthRequired={onAuthRequired}
      />
      
      <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="pt-4">
          {children}
        </div>
      </main>

      <Navigation />
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
