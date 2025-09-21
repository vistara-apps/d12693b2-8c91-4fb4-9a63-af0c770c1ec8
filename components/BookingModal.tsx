'use client'

import { useState } from 'react'
import { Experience } from '@/types'
import { Button } from '@/components/ui/Button'
import { mockChefs } from '@/lib/mockData'

interface BookingModalProps {
  experience: Experience
  isOpen: boolean
  onClose: () => void
  onConfirm: (slotId: string) => void
  isBooking?: boolean
  bookingSuccess?: boolean
}

export function BookingModal({
  experience,
  isOpen,
  onClose,
  onConfirm,
  isBooking = false,
  bookingSuccess = false
}: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const chef = mockChefs.find(c => c.chefId === experience.chefId)

  if (!isOpen) return null

  const availableSlots = experience.availability_slots.filter(slot => slot.is_available)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Book Experience</h2>

        {bookingSuccess ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Booking Confirmed!</h3>
            <p className="text-text-secondary">You&apos;ll receive a confirmation email shortly.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-text-primary">{experience.title}</h3>
              <p className="text-text-secondary">by {chef?.name}</p>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-2">Select Time Slot</h4>
              <div className="space-y-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`w-full p-3 rounded-md border text-left transition-colors ${
                      selectedSlot === slot.id
                        ? 'border-accent bg-accent/10'
                        : 'border-surface hover:border-accent/50'
                    }`}
                    disabled={isBooking}
                  >
                    <div className="text-text-primary">
                      {slot.start_time.toLocaleDateString()} at {slot.start_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-sm text-text-secondary">
                      Duration: {experience.duration} minutes
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-surface pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-text-primary">Total:</span>
                <span className="text-xl font-bold text-primary">${experience.price}</span>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isBooking}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => selectedSlot && onConfirm(selectedSlot)}
                  disabled={!selectedSlot || isBooking}
                  className="flex-1"
                >
                  {isBooking ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

