'use client'

import { Chef } from '@/types'

interface ChefCardProps {
  chef: Chef
  variant?: 'compact' | 'detailed'
}

export function ChefCard({ chef, variant = 'compact' }: ChefCardProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-surface rounded-lg p-4 shadow-card">
        <div className="flex items-center space-x-3">
          {chef.profile_picture_url && (
            <img
              src={chef.profile_picture_url}
              alt={chef.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="font-semibold text-text-primary">{chef.name}</h3>
            <p className="text-sm text-text-secondary">{chef.cuisine_specialty}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <div className="flex items-start space-x-4">
        {chef.profile_picture_url && (
          <img
            src={chef.profile_picture_url}
            alt={chef.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary mb-2">{chef.name}</h3>
          <p className="text-text-secondary mb-2">{chef.cuisine_specialty}</p>
          <p className="text-text-secondary mb-4">{chef.bio}</p>
          {chef.verification_status === 'verified' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
              ✓ Verified Chef
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

