import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/auth'

export const runtime = 'nodejs'

async function requireAdmin() {
  // Read the admin session cookie and verify it.
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  return verifyAdminSession(token)
}

// Restrict status updates to known workflow values.
const statusSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'FOLLOW_UP', 'ARCHIVED']),
})

export async function PATCH(
  request: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  // Only admins can update contact status.
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Support both sync and async params in the route context.
  const { id } = await Promise.resolve(context.params)
  const payload = await request.json()
  const parsed = statusSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  // Persist the status change for the specified contact.
  const contact = await prisma.contact.update({
    where: { id },
    data: { status: parsed.data.status },
  })

  return NextResponse.json({ data: contact })
}
