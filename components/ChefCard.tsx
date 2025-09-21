'use client';

import { Chef } from '@/lib/types';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { cn, truncateText } from '@/lib/utils';
import Image from 'next/image';

interface ChefCardProps {
  chef: Chef;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function ChefCard({ chef, variant = 'compact', onClick }: ChefCardProps) {
  const isDetailed = variant === 'detailed';

  return (
    <div
      className={cn(
        'card hover:shadow-lg transition-all duration-200 cursor-pointer group',
        'hover:scale-[1.02] active:scale-[0.98]'
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-surface">
            <Image
              src={chef.profile_picture_url}
              alt={chef.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          {chef.verification_status === 'verified' && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
              {chef.name}
            </h3>
            {chef.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-text-primary">
                  {chef.rating}
                </span>
                <span className="text-xs text-text-secondary">
                  ({chef.total_reviews})
                </span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
              {chef.cuisine_specialty}
            </span>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">
            {isDetailed ? chef.bio : truncateText(chef.bio, 80)}
          </p>
        </div>
      </div>
    </div>
  );
}
