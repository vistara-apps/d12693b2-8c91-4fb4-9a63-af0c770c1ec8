import { Chef, Experience, User, Booking, Review } from '@/types'

export const mockChefs: Chef[] = [
  {
    chefId: 'chef-1',
    userId: 'user-1',
    name: 'Maria Rodriguez',
    bio: 'Passionate Italian chef with 15 years of experience in authentic pasta making and Mediterranean cuisine.',
    cuisine_specialty: 'Italian',
    profile_picture_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    verification_status: 'verified',
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15'),
  },
  {
    chefId: 'chef-2',
    userId: 'user-2',
    name: 'James Chen',
    bio: 'Award-winning sushi master specializing in traditional Japanese techniques and modern fusion.',
    cuisine_specialty: 'Japanese',
    profile_picture_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=face',
    verification_status: 'verified',
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-01-20'),
  },
]

export const mockExperiences: Experience[] = [
  {
    experienceId: 'exp-1',
    chefId: 'chef-1',
    title: 'Authentic Italian Pasta Making',
    description: 'Learn to make fresh pasta from scratch using traditional Italian techniques. Includes hands-on experience with dough preparation, shaping, and cooking three different pasta varieties.',
    price: 85,
    type: 'in-person',
    duration: 180,
    availability_slots: [
      {
        id: 'slot-1',
        start_time: new Date('2024-02-15T14:00:00'),
        end_time: new Date('2024-02-15T17:00:00'),
        is_available: true,
      },
      {
        id: 'slot-2',
        start_time: new Date('2024-02-16T10:00:00'),
        end_time: new Date('2024-02-16T13:00:00'),
        is_available: true,
      },
    ],
    location: '123 Culinary Street, Downtown',
    ingredients_kit_details: 'All ingredients included - flour, eggs, tomatoes, basil, parmesan cheese',
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15'),
  },
  {
    experienceId: 'exp-2',
    chefId: 'chef-2',
    title: 'Sushi Masterclass',
    description: 'Master the art of sushi making with step-by-step guidance. Learn to prepare nigiri, maki rolls, and sashimi with the freshest fish and traditional techniques.',
    price: 120,
    type: 'virtual',
    duration: 150,
    availability_slots: [
      {
        id: 'slot-3',
        start_time: new Date('2024-02-18T19:00:00'),
        end_time: new Date('2024-02-18T21:30:00'),
        is_available: true,
      },
    ],
    virtual_link: 'zoom.us/j/example',
    ingredients_kit_details: 'Ingredients kit shipped to your door - sushi rice, nori, fish, vegetables',
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-01-20'),
  },
]

export const mockUsers: User[] = [
  {
    userId: 'user-1',
    farcaster_id: 'maria',
    wallet_address: '0x1234567890123456789012345678901234567890',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-10'),
  },
]

export const mockBookings: Booking[] = []

export const mockReviews: Review[] = []

