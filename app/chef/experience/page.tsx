'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/AppShell'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function CreateExperience() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'in-person' as 'in-person' | 'virtual',
    duration: '',
    location: '',
    virtual_link: '',
    ingredients_kit_details: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chefId: 'chef-1', // TODO: Get from authentication
          ...formData,
        }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        console.error('Experience creation failed')
      }
    } catch (error) {
      console.error('Experience creation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Create Experience</h1>
          <p className="text-text-secondary">
            Share your culinary expertise with food enthusiasts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Experience Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Authentic Italian Pasta Making"
            required
            disabled={isSubmitting}
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe what participants will learn and experience..."
              className="w-full px-3 py-2 bg-surface border border-surface rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              rows={4}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              type="number"
              placeholder="85"
              required
              disabled={isSubmitting}
            />

            <Input
              label="Duration (minutes)"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              type="number"
              placeholder="180"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Experience Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-surface rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              disabled={isSubmitting}
            >
              <option value="in-person">In-Person</option>
              <option value="virtual">Virtual</option>
            </select>
          </div>

          {formData.type === 'in-person' ? (
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Address or venue name"
              required
              disabled={isSubmitting}
            />
          ) : (
            <Input
              label="Virtual Meeting Link"
              value={formData.virtual_link}
              onChange={(e) => handleChange('virtual_link', e.target.value)}
              placeholder="Zoom, Google Meet, etc."
              required
              disabled={isSubmitting}
            />
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Ingredients Kit Details (Optional)
            </label>
            <textarea
              value={formData.ingredients_kit_details}
              onChange={(e) => handleChange('ingredients_kit_details', e.target.value)}
              placeholder="What ingredients will be provided? Any special preparation needed?"
              className="w-full px-3 py-2 bg-surface border border-surface rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Experience...' : 'Create Experience'}
          </Button>
        </form>
      </div>
    </AppShell>
  )
}

