import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const statusSchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'FOLLOW_UP', 'ARCHIVED']),
})

export async function PATCH(
  request: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
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

  const contact = await prisma.contact.update({
    where: { id },
    data: { status: parsed.data.status },
  })

  return NextResponse.json({ data: contact })
}
