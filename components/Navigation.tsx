'use client';

import { Home, Search, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/', active: true },
  { icon: Search, label: 'Discover', href: '/discover', active: false },
  { icon: Calendar, label: 'Bookings', href: '/bookings', active: false },
  { icon: User, label: 'Profile', href: '/profile', active: false },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-t border-gray-700">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={cn(
                  'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200',
                  item.active
                    ? 'text-primary bg-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                )}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
