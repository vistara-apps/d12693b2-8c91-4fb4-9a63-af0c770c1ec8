import { NextRequest, NextResponse } from 'next/server'

// Mock database - in production, this would be a real database
let bookings: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { experienceId, slotId, userId } = body

    // Validate required fields
    if (!experienceId || !slotId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create booking
    const booking = {
      bookingId: `booking-${Date.now()}`,
      userId,
      experienceId,
      booking_time: new Date(),
      payment_status: 'pending',
      event_status: 'upcoming',
      slotId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    bookings.push(booking)

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    bookings,
  })
}

