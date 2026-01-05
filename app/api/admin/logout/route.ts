import { NextResponse } from 'next/server'
import { getSessionCookieOptions } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url))
  response.cookies.set(getSessionCookieOptions().name, '', {
    ...getSessionCookieOptions(),
    maxAge: 0,
  })
  return response
}
