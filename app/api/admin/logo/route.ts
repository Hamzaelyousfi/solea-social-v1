import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile } from 'fs/promises'
import path from 'path'
import { verifyAdminSession } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  const session = token ? await verifyAdminSession(token) : null
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('logo')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const logoPath = path.join(process.cwd(), 'public', 'logo.png')
  await writeFile(logoPath, buffer)

  return NextResponse.json({ ok: true, url: `/logo.png?t=${Date.now()}` })
}
