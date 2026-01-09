import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/auth'

export const runtime = 'nodejs'

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  return verifyAdminSession(token)
}

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().optional(),
  projectType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1),
})

export async function GET() {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json({ data: contacts })
}

export async function POST(request: Request) {
  const payload = await request.json()
  const parsed = contactSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const contact = await prisma.contact.create({
    data: parsed.data,
  })

  return NextResponse.json({ data: contact }, { status: 201 })
}
