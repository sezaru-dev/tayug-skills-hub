export const dynamic = "force-dynamic"
import cloudinary from '@/lib/cloudinary'
import { verifySession } from '@/lib/verify-session'
import { Role } from '@/types/roles'
import { UploadApiResponse } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {

  //verify session
  const session = await verifySession([Role.PROVIDER])

  if (session instanceof NextResponse) {
    return session // EARLY RETURN
  }

  const userId = session.user.id

  const formData = await req.formData()
  const file = formData.get('file') as File

  const MAX_SIZE = 3 * 1024 * 1024
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const res = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: `tayugskillshub/providers/${userId}/projects` }, (error, result) => {
          if (error) return reject(error)
          resolve(result as UploadApiResponse)
        })
        .end(buffer)
    })
    const { secure_url, public_id } = res

    return NextResponse.json({ secure_url, public_id }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
