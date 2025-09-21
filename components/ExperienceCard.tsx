'use client'

import { Experience } from '@/types'
import { Button } from '@/components/ui/Button'
import { mockChefs } from '@/lib/mockData'

interface ExperienceCardProps {
  experience: Experience
  onBook: () => void
}

export function ExperienceCard({ experience, onBook }: ExperienceCardProps) {
  const chef = mockChefs.find(c => c.chefId === experience.chefId)

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <div className="flex items-start space-x-4">
        {chef?.profile_picture_url && (
          <img
            src={chef.profile_picture_url}
            alt={chef.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            {experience.title}
          </h3>
          <p className="text-text-secondary mb-2">
            by {chef?.name} • {chef?.cuisine_specialty}
          </p>
          <p className="text-text-secondary mb-4">
            {experience.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-text-primary">
              <span className="text-2xl font-bold">${experience.price}</span>
              <span className="text-sm ml-1">• {experience.duration} min</span>
            </div>
            <Button onClick={onBook}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

