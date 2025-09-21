'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExperienceCard } from '@/components/ExperienceCard'
import { BookingModal } from '@/components/BookingModal'
import { AppShell } from '@/components/AppShell'
import { Button } from '@/components/ui/Button'
import { mockExperiences } from '@/lib/mockData'

export default function Home() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const openModal = (experienceId: string) => {
    setSelectedExperience(experienceId)
    setIsBookingModalOpen(true)
  }

  const closeModal = () => {
    setIsBookingModalOpen(false)
    setSelectedExperience(null)
    setBookingSuccess(false)
  }

  const handleBook = async (slotId: string) => {
    if (!selectedExperience) return

    setIsBooking(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user-1', // TODO: Get from authentication
          experienceId: selectedExperience,
          booking_time: new Date().toISOString(),
          payment_status: 'pending',
          event_status: 'confirmed',
        }),
      })

      if (response.ok) {
        setBookingSuccess(true)
      } else {
        console.error('Booking failed')
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsBooking(false)
    }
  }

  const selectedExperienceData = selectedExperience
    ? mockExperiences.find(exp => exp.experienceId === selectedExperience)
    : null

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">Forkd</h1>
          <p className="text-xl text-text-secondary mb-8">
            Discover and book unique culinary experiences with local chefs
          </p>
          <Link href="/chef">
            <Button variant="secondary">Become a Chef</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExperiences.map((experience) => (
            <ExperienceCard
              key={experience.experienceId}
              experience={experience}
              onBook={() => openModal(experience.experienceId)}
            />
          ))}
        </div>

        {selectedExperienceData && (
          <BookingModal
            experience={selectedExperienceData}
            isOpen={isBookingModalOpen}
            onClose={closeModal}
            onConfirm={handleBook}
            isBooking={isBooking}
            bookingSuccess={bookingSuccess}
          />
        )}
      </div>
    </AppShell>
  )
}

