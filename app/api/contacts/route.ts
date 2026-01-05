import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

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
