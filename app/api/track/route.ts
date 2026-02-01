import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

// Validate tracking payloads for page view events.
const trackSchema = z.object({
  path: z.string().min(1),
  referrer: z.string().optional().nullable(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
})

// Map known referrers to normalized sources.
const sourceMap: Array<{ match: RegExp; source: string }> = [
  { match: /instagram\.com/i, source: 'INSTAGRAM' },
  { match: /facebook\.com/i, source: 'FACEBOOK' },
  { match: /linkedin\.com/i, source: 'LINKEDIN' },
  { match: /google\./i, source: 'GOOGLE' },
]

function resolveSource(referrer?: string | null, utmSource?: string | null) {
  // Prefer explicit UTM source labels, then fall back to referrer matching.
  if (utmSource) {
    const normalized = utmSource.toLowerCase()
    if (normalized.includes('instagram')) return 'INSTAGRAM'
    if (normalized.includes('facebook')) return 'FACEBOOK'
    if (normalized.includes('linkedin')) return 'LINKEDIN'
    if (normalized.includes('google')) return 'GOOGLE'
    return 'OTHER'
  }
  if (!referrer) return 'DIRECT'
  const match = sourceMap.find((entry) => entry.match.test(referrer))
  return match?.source ?? 'REFERRAL'
}

export async function POST(request: Request) {
  // Parse and validate the incoming tracking data.
  const payload = await request.json()
  const parsed = trackSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // Normalize values and persist the page view.
  const { path, referrer, utmSource, utmMedium } = parsed.data
  const source = resolveSource(referrer, utmSource)
  const userAgent = request.headers.get('user-agent')

  await prisma.pageView.create({
    data: {
      path,
      referrer: referrer || null,
      source,
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      userAgent,
    },
  })

  return NextResponse.json({ ok: true })
}
