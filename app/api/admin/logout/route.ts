import { NextResponse } from 'next/server'
import { getSessionCookieOptions, isHttpsRequest } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  // Redirect back to login and clear the session cookie.
  const response = NextResponse.redirect(new URL('/admin/login', request.url))
  const isSecure = isHttpsRequest(request)
  response.cookies.set(getSessionCookieOptions(isSecure).name, '', {
    ...getSessionCookieOptions(isSecure),
    maxAge: 0,
  })
  return response
}
