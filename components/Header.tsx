'use client';

import { Menu, User } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  // TODO: Add authentication logic once MiniKit hooks are available
  const user = null; // Placeholder for user state

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-primary">🍴</div>
              <h1 className="text-xl font-bold text-text-primary">Forkd</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-text-primary hidden sm:block">
                  User
                </span>
              </div>
            ) : (
              <Button variant="outline" size="sm">
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
