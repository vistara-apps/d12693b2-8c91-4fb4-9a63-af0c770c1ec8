'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/AppShell'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ChefOnboarding() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    cuisine_specialty: '',
    profile_picture_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/chefs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user-1', // TODO: Get from authentication
          ...formData,
        }),
      })

      if (response.ok) {
        router.push('/chef/experience')
      } else {
        console.error('Chef creation failed')
      }
    } catch (error) {
      console.error('Chef creation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AppShell>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Become a Chef</h1>
          <p className="text-text-secondary">
            Share your culinary expertise and create unique experiences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Chef Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your full name"
            required
            disabled={isSubmitting}
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Tell us about your culinary background and expertise..."
              className="w-full px-3 py-2 bg-surface border border-surface rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              rows={4}
              required
              disabled={isSubmitting}
            />
          </div>

          <Input
            label="Cuisine Specialty"
            value={formData.cuisine_specialty}
            onChange={(e) => handleChange('cuisine_specialty', e.target.value)}
            placeholder="e.g., Italian, Japanese, French"
            required
            disabled={isSubmitting}
          />

          <Input
            label="Profile Picture URL"
            value={formData.profile_picture_url}
            onChange={(e) => handleChange('profile_picture_url', e.target.value)}
            placeholder="https://..."
            type="url"
            disabled={isSubmitting}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Profile...' : 'Create Chef Profile'}
          </Button>
        </form>
      </div>
    </AppShell>
  )
}

