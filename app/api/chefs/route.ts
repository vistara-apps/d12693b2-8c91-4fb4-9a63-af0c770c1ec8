import { NextRequest, NextResponse } from 'next/server'
import { mockChefs } from '@/lib/mockData'

// Mock database - in production, this would be a real database
let chefs = [...mockChefs]

export async function GET() {
  return NextResponse.json({
    chefs,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, name, bio, cuisine_specialty, profile_picture_url } = body

    // Validate required fields
    if (!userId || !name || !bio || !cuisine_specialty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create chef
    const chef = {
      chefId: `chef-${Date.now()}`,
      userId,
      name,
      bio,
      cuisine_specialty,
      profile_picture_url,
      verification_status: 'pending' as const,
      created_at: new Date(),
      updated_at: new Date(),
    }

    chefs.push(chef)

    return NextResponse.json({
      success: true,
      chef,
    })
  } catch (error) {
    console.error('Chef creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

