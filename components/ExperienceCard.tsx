'use client';

import { Experience } from '@/lib/types';
import { Clock, MapPin, Users, Star, Video } from 'lucide-react';
import { cn, formatPrice, formatDuration } from '@/lib/utils';
import { Button } from './ui/Button';
import Image from 'next/image';

interface ExperienceCardProps {
  experience: Experience;
  variant?: 'preview' | 'booking';
  onClick?: () => void;
}

export function ExperienceCard({ experience, variant = 'preview', onClick }: ExperienceCardProps) {
  const isBooking = variant === 'booking';

  return (
    <div
      className={cn(
        'card hover:shadow-lg transition-all duration-200 cursor-pointer group',
        'hover:scale-[1.02] active:scale-[0.98]'
      )}
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Image */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface">
          {experience.image_url && (
            <Image
              src={experience.image_url}
              alt={experience.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <div className={cn(
              'flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium',
              experience.type === 'virtual'
                ? 'bg-accent/20 text-accent'
                : 'bg-primary/20 text-primary'
            )}>
              {experience.type === 'virtual' ? (
                <Video className="h-3 w-3" />
              ) : (
                <MapPin className="h-3 w-3" />
              )}
              <span className="capitalize">{experience.type}</span>
            </div>
          </div>

          {/* Price badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {formatPrice(experience.price)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 mb-1">
              {experience.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(experience.duration)}</span>
              </div>
              
              {experience.total_bookings && (
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{experience.total_bookings} booked</span>
                </div>
              )}
            </div>

            {experience.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium text-text-primary">
                  {experience.rating}
                </span>
              </div>
            )}
          </div>

          {/* Location or virtual info */}
          {experience.location && (
            <div className="flex items-center space-x-1 text-sm text-text-secondary">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          )}

          {experience.ingredients_kit_details && (
            <div className="text-sm text-accent bg-accent/10 p-2 rounded-md">
              📦 {experience.ingredients_kit_details}
            </div>
          )}

          {/* Action button for booking variant */}
          {isBooking && (
            <Button className="w-full" onClick={(e) => {
              e.stopPropagation();
              // Handle booking action
            }}>
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
