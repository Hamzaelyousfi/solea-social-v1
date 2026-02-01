import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { createAdminSessionToken, getSessionCookieOptions, hashPassword, isHttpsRequest, verifyAdminSession } from '@/lib/auth'

export const runtime = 'nodejs'

// Accept partial admin profile updates.
const settingsSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
})

async function requireAdmin() {
  // Read the admin session cookie and verify it.
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  return verifyAdminSession(token)
}

export async function GET() {
  // Only admins can read their settings.
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Limit the returned fields to avoid exposing secrets.
  const admin = await prisma.adminUser.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, name: true },
  })

  if (!admin) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ data: admin })
}

export async function PATCH(request: Request) {
  // Only admins can update settings.
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const isSecure = isHttpsRequest(request)
  // Validate the incoming changes.
  const payload = await request.json()
  const parsed = settingsSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // Build the update payload, hashing the password when provided.
  const updates: { name?: string; email?: string; passwordHash?: string } = {}
  if (parsed.data.name) updates.name = parsed.data.name
  if (parsed.data.email) updates.email = parsed.data.email
  if (parsed.data.password) updates.passwordHash = hashPassword(parsed.data.password)

  // Reject no-op updates to avoid a meaningless write.
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No changes' }, { status: 400 })
  }

  // Persist the changes and return the updated profile.
  const admin = await prisma.adminUser.update({
    where: { id: session.sub },
    data: updates,
    select: { id: true, email: true, name: true },
  })

  const response = NextResponse.json({ data: admin })
  // If the email changed, refresh the session token to match it.
  if (parsed.data.email && parsed.data.email !== session.email) {
    const token = createAdminSessionToken(admin.id, admin.email)
    response.cookies.set(getSessionCookieOptions(isSecure).name, token, getSessionCookieOptions(isSecure))
  }

  return response
}
