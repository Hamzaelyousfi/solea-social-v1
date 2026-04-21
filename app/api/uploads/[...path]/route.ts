import { readFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export const runtime = 'nodejs'

const UPLOAD_ROOT = path.join(process.cwd(), 'public', 'uploads')

const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const segments = (await params).path
  const filePath = path.resolve(UPLOAD_ROOT, ...segments)

  if (!filePath.startsWith(UPLOAD_ROOT + path.sep)) {
    return new NextResponse(null, { status: 403 })
  }

  try {
    const buf = await readFile(filePath)
    const ext = path.extname(filePath).slice(1).toLowerCase()
    const contentType = MIME[ext] ?? 'application/octet-stream'

    return new NextResponse(buf, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
