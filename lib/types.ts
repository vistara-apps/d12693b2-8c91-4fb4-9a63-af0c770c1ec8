export interface User {
  userId: string;
  farcaster_id?: string;
  wallet_address?: string;
  name: string;
  email?: string;
}

export interface Chef {
  chefId: string;
  userId: string;
  name: string;
  bio: string;
  cuisine_specialty: string;
  profile_picture_url: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  rating?: number;
  total_reviews?: number;
}

export interface Experience {
  experienceId: string;
  chefId: string;
  title: string;
  description: string;
  price: number;
  type: 'in-person' | 'virtual';
  duration: number; // in minutes
  availability_slots: string[];
  location?: string;
  virtual_link?: string;
  ingredients_kit_details?: string;
  image_url?: string;
  rating?: number;
  total_bookings?: number;
}

export interface Booking {
  bookingId: string;
  userId: string;
  experienceId: string;
  booking_time: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  event_status: 'upcoming' | 'completed' | 'cancelled';
  total_amount: number;
}

export interface Review {
  reviewId: string;
  bookingId: string;
  rating: number;
  comment: string;
  review_time: string;
  user_name: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
