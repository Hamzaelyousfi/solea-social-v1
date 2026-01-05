import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createAdminSessionToken, getSessionCookieOptions, verifyPassword } from '@/lib/auth'

export const runtime = 'nodejs'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: Request) {
  const payload = await request.json()
  const parsed = loginSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  })

  if (!admin || !verifyPassword(parsed.data.password, admin.passwordHash)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = createAdminSessionToken(admin.id, admin.email)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(getSessionCookieOptions().name, token, getSessionCookieOptions())
  return response
}
