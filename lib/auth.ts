import crypto from 'crypto'

const SESSION_COOKIE = 'admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

type SessionPayload = {
  sub: string
  email: string
  exp: number
}

function requireSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set')
  }
  return secret
}

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString('base64url')
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, 'base64url').toString('utf-8')
}

function sign(input: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(input).digest('base64url')
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function createAdminSessionToken(userId: string, email: string) {
  const secret = requireSecret()
  const payload: SessionPayload = {
    sub: userId,
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const encoded = base64UrlEncode(JSON.stringify(payload))
  const signature = sign(encoded, secret)
  return `${encoded}.${signature}`
}

export function getSessionCookieOptions(secureOverride?: boolean) {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    path: '/',
    sameSite: 'lax' as const,
    secure: typeof secureOverride === 'boolean' ? secureOverride : process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS,
  }
}

export function isHttpsRequest(request: Request) {
  const forwarded = request.headers.get('x-forwarded-proto')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() === 'https'
  }
  return new URL(request.url).protocol === 'https:'
}

export async function verifyAdminSession(token: string) {
  const secret = requireSecret()
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) {
    return null
  }
  const expected = sign(encoded, secret)
  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null
  }
  try {
    const payload = JSON.parse(base64UrlDecode(encoded)) as SessionPayload
    if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) {
    return false
  }
  const derived = crypto.scryptSync(password, salt, 64).toString('hex')
  const hashBuffer = Buffer.from(hash)
  const derivedBuffer = Buffer.from(derived)
  if (hashBuffer.length !== derivedBuffer.length) {
    return false
  }
  return crypto.timingSafeEqual(hashBuffer, derivedBuffer)
}
