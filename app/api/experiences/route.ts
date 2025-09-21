import { NextRequest, NextResponse } from 'next/server'
import { mockExperiences } from '@/lib/mockData'

// Mock database - in production, this would be a real database
let experiences = [...mockExperiences]

export async function GET() {
  return NextResponse.json({
    experiences,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      chefId,
      title,
      description,
      price,
      type,
      duration,
      location,
      virtual_link,
      ingredients_kit_details,
    } = body

    // Validate required fields
    if (!chefId || !title || !description || !price || !type || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create experience
    const experience = {
      experienceId: `exp-${Date.now()}`,
      chefId,
      title,
      description,
      price: parseFloat(price),
      type,
      duration: parseInt(duration),
      availability_slots: [], // Would be populated based on scheduling logic
      location: type === 'in-person' ? location : undefined,
      virtual_link: type === 'virtual' ? virtual_link : undefined,
      ingredients_kit_details,
      created_at: new Date(),
      updated_at: new Date(),
    }

    experiences.push(experience)

    return NextResponse.json({
      success: true,
      experience,
    })
  } catch (error) {
    console.error('Experience creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

