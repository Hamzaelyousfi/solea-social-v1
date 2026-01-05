'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setState('loading')
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      router.push('/admin/dashboard')
      return
    }

    setState('error')
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/60 p-8 shadow-[0_24px_70px_rgba(15,15,15,0.18)] backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Admin access
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Connexion securisee</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Entrez votre email et mot de passe pour acceder au dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_14px_30px_rgba(15,15,15,0.12)] backdrop-blur-xl focus:border-white/80 focus:outline-none"
              placeholder="admin@solea.local"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_14px_30px_rgba(15,15,15,0.12)] backdrop-blur-xl focus:border-white/80 focus:outline-none"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          {state === 'error' && (
            <p className="text-sm text-destructive">
              Email ou mot de passe invalide.
            </p>
          )}
          <button
            type="submit"
            disabled={state === 'loading'}
            className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[0_18px_45px_rgba(15,15,15,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {state === 'loading' ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
