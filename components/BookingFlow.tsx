'use client';

import { useState, useEffect } from 'react';
import { Experience, Booking } from '@/lib/types';
import { CalendarPicker } from './CalendarPicker';
import { PaymentForm } from './PaymentForm';
import { Button } from './ui/Button';
import { Clock, MapPin, Video, Package, CreditCard } from 'lucide-react';
import { formatPrice, formatDuration } from '@/lib/utils';

interface BookingFlowProps {
  experience: Experience;
  onClose: () => void;
  onBookingComplete: (booking: Booking) => void;
}

type BookingStep = 'details' | 'datetime' | 'payment' | 'confirmation';

export function BookingFlow({ experience, onClose, onBookingComplete }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('details');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available time slots for the selected date
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      // Filter available slots for the selected date
      const dateStr = selectedDate.toISOString().split('T')[0];
      const daySlots = experience.availability_slots.filter(slot =>
        slot.startsWith(dateStr)
      );

      // Extract time portions
      const times = daySlots.map(slot => {
        const date = new Date(slot);
        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      });

      setAvailableTimes(times);
      setSelectedTime(''); // Reset time selection
    }
  }, [selectedDate, experience.availability_slots]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'details':
        setCurrentStep('datetime');
        break;
      case 'datetime':
        if (selectedDate && selectedTime) {
          setCurrentStep('payment');
        }
        break;
      case 'payment':
        handlePayment();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'datetime':
        setCurrentStep('details');
        break;
      case 'payment':
        setCurrentStep('datetime');
        break;
      case 'confirmation':
        onClose();
        break;
    }
  };

  const handlePayment = async () => {
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    setError(null);

    try {
      // Create booking datetime
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':');
      const hour24 = period === 'PM' && hours !== '12' ? parseInt(hours) + 12 :
                    period === 'AM' && hours === '12' ? 0 : parseInt(hours);

      const bookingDateTime = new Date(selectedDate);
      bookingDateTime.setHours(hour24, parseInt(minutes), 0, 0);

      // Create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user1', // In a real app, get from auth
          experienceId: experience.experienceId,
          booking_time: bookingDateTime.toISOString(),
          total_amount: experience.price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      setCurrentStep('confirmation');
      onBookingComplete(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'details':
        return true;
      case 'datetime':
        return selectedDate && selectedTime;
      case 'payment':
        return true;
      default:
        return false;
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'details', label: 'Details' },
      { key: 'datetime', label: 'Date & Time' },
      { key: 'payment', label: 'Payment' },
      { key: 'confirmation', label: 'Confirmation' },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep === step.key
                ? 'bg-primary text-white'
                : steps.findIndex(s => s.key === currentStep) > index
                ? 'bg-accent text-white'
                : 'bg-surface text-text-secondary'
            }`}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 ${
                steps.findIndex(s => s.key === currentStep) > index
                  ? 'bg-accent'
                  : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">{experience.title}</h2>
        <p className="text-text-secondary">{experience.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-accent" />
          <span className="text-text-secondary">{formatDuration(experience.duration)}</span>
        </div>

        <div className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-accent" />
          <span className="text-text-secondary">{formatPrice(experience.price)}</span>
        </div>

        {experience.type === 'in-person' && experience.location && (
          <div className="flex items-center space-x-2 col-span-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-text-secondary">{experience.location}</span>
          </div>
        )}

        {experience.type === 'virtual' && (
          <div className="flex items-center space-x-2 col-span-2">
            <Video className="w-5 h-5 text-accent" />
            <span className="text-text-secondary">Virtual experience</span>
          </div>
        )}

        {experience.ingredients_kit_details && (
          <div className="flex items-start space-x-2 col-span-2">
            <Package className="w-5 h-5 text-accent mt-0.5" />
            <span className="text-text-secondary">{experience.ingredients_kit_details}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderDateTimeStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4">Select Date & Time</h2>
        <CalendarPicker
          selectedDate={selectedDate || undefined}
          onDateSelect={handleDateSelect}
          availableSlots={experience.availability_slots}
        />
      </div>

      {selectedDate && availableTimes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-3">Available Times</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  selectedTime === time
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-accent text-text-primary'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && availableTimes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">No available times for this date.</p>
        </div>
      )}
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-text-primary mb-4">Payment Details</h2>

      <PaymentForm
        amount={experience.price}
        bookingId={`booking_${Date.now()}`} // This would be the actual booking ID
        onPaymentComplete={(payment) => {
          // Payment completed, proceed to confirmation
          setCurrentStep('confirmation');
        }}
        onCancel={() => setCurrentStep('datetime')}
      />
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
        <CreditCard className="w-8 h-8 text-accent" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Booking Confirmed!</h2>
        <p className="text-text-secondary">
          Your culinary experience has been successfully booked.
          You will receive a confirmation email with all the details.
        </p>
      </div>

      <div className="card text-left">
        <h3 className="font-semibold text-text-primary mb-4">Booking Details</h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Experience:</span>
            <span className="text-text-primary">{experience.title}</span>
          </div>

          {selectedDate && selectedTime && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Date & Time:</span>
              <span className="text-text-primary">
                {selectedDate.toLocaleDateString()} at {selectedTime}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-text-secondary">Total Paid:</span>
            <span className="text-primary font-medium">{formatPrice(experience.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-bg rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {renderStepIndicator()}

          <div className="mb-8">
            {currentStep === 'details' && renderDetailsStep()}
            {currentStep === 'datetime' && renderDateTimeStep()}
            {currentStep === 'payment' && renderPaymentStep()}
            {currentStep === 'confirmation' && renderConfirmationStep()}
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {currentStep !== 'confirmation' && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 'details'}
              >
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed() || loading}
              >
                {loading ? 'Processing...' :
                 currentStep === 'payment' ? 'Complete Payment' :
                 currentStep === 'datetime' ? 'Continue to Payment' : 'Next'}
              </Button>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="flex justify-center">
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
