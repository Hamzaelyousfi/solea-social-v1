import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createAdminSessionToken, getSessionCookieOptions, isHttpsRequest, verifyPassword } from '@/lib/auth'

export const runtime = 'nodejs'

// Validate admin login credentials.
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: Request) {
  // Parse and validate the JSON payload.
  const payload = await request.json()
  const parsed = loginSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  })

  // Reject invalid email/password combinations.
  if (!admin || !verifyPassword(parsed.data.password, admin.passwordHash)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Issue a signed session token in a cookie.
  const token = createAdminSessionToken(admin.id, admin.email)
  const response = NextResponse.json({ ok: true })
  const isSecure = isHttpsRequest(request)
  response.cookies.set(getSessionCookieOptions(isSecure).name, token, getSessionCookieOptions(isSecure))
  return response
}
