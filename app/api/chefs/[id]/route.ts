import { NextRequest, NextResponse } from 'next/server';
import { mockChefs } from '@/lib/mock-data';

// GET /api/chefs/[id] - Get a specific chef
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chefId = params.id;

    const chef = mockChefs.find(c => c.chefId === chefId);

    if (!chef) {
      return NextResponse.json(
        { error: 'Chef not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: chef,
      success: true
    });
  } catch (error) {
    console.error('Error fetching chef:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chef', success: false },
      { status: 500 }
    );
  }
}

// PUT /api/chefs/[id] - Update a chef
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chefId = params.id;
    const body = await request.json();

    const chefIndex = mockChefs.findIndex(c => c.chefId === chefId);

    if (chefIndex === -1) {
      return NextResponse.json(
        { error: 'Chef not found', success: false },
        { status: 404 }
      );
    }

    // Update chef data
    const updatedChef = {
      ...mockChefs[chefIndex],
      ...body,
      chefId // Ensure ID doesn't change
    };

    mockChefs[chefIndex] = updatedChef;

    return NextResponse.json({
      data: updatedChef,
      success: true
    });
  } catch (error) {
    console.error('Error updating chef:', error);
    return NextResponse.json(
      { error: 'Failed to update chef', success: false },
      { status: 500 }
    );
  }
}

