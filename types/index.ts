export interface Chef {
  chefId: string
  userId: string
  name: string
  bio: string
  cuisine_specialty: string
  profile_picture_url?: string
  verification_status: 'pending' | 'verified' | 'rejected'
  created_at: Date
  updated_at: Date
}

export interface Experience {
  experienceId: string
  chefId: string
  title: string
  description: string
  price: number
  type: 'in-person' | 'virtual'
  duration: number // in minutes
  availability_slots: AvailabilitySlot[]
  location?: string
  virtual_link?: string
  ingredients_kit_details?: string
  created_at: Date
  updated_at: Date
}

export interface AvailabilitySlot {
  id: string
  start_time: Date
  end_time: Date
  is_available: boolean
}

export interface User {
  userId: string
  farcaster_id?: string
  wallet_address?: string
  name?: string
  email?: string
  created_at: Date
  updated_at: Date
}

export interface Booking {
  bookingId: string
  userId: string
  experienceId: string
  booking_time: Date
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  event_status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled'
  created_at: Date
  updated_at: Date
}

export interface Review {
  reviewId: string
  bookingId: string
  rating: number // 1-5
  comment?: string
  review_time: Date
  created_at: Date
  updated_at: Date
}

