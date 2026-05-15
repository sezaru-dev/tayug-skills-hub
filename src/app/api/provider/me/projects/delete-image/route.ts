import cloudinary from '@/lib/cloudinary'
import { verifySession } from '@/lib/verify-session'
import { Role } from '@/types/roles'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  // verify session
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) {
    return session // early return
  }

  try {
    // parse body
    const { public_id } = await req.json()

    if (!public_id) {
      return NextResponse.json(
        { error: 'public_id is required' },
        { status: 400 }
      )
    }
    // ensure the image belongs to the user (security check)
    if (!public_id.startsWith(`tayugskillshub/providers/${session.user.id}`)) {
      return NextResponse.json(
        { error: 'Unauthorized image deletion' },
        { status: 403 }
      )
    }

    // delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id)

    // Cloudinary returns:
    // { result: 'ok' } OR { result: 'not found' }

    if (result.result !== 'ok' && result.result !== 'not found') {
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    // success (idempotent behavior)
    return NextResponse.json(
      { message: 'Image deleted successfully', result: result.result },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}