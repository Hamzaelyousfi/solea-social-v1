'use client'

import { useEffect, useRef, useState } from 'react'

type AdminSettings = {
  name: string
  email: string
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<AdminSettings>({ name: '', email: '' })
  const initialForm = useRef<AdminSettings>({ name: '', email: '' })
  const [password, setPassword] = useState('')
  const [logoPreview, setLogoPreview] = useState('/logo.png')
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [logoStatus, setLogoStatus] = useState<'idle' | 'saving' | 'success' | 'error'>(
    'idle'
  )

  useEffect(() => {
    let active = true
    fetch('/api/admin/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.data) return
        const nextForm = { name: data.data.name, email: data.data.email }
        initialForm.current = nextForm
        setForm(nextForm)
      })
      .catch(() => {})

    setLogoPreview(`/logo.png?t=${Date.now()}`)
    return () => {
      active = false
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('saving')
    setErrorMessage('')
    const payload: { name?: string; email?: string; password?: string } = {}
    const trimmedName = form.name.trim()
    const trimmedEmail = form.email.trim()
    if (trimmedName && trimmedName !== initialForm.current.name) {
      payload.name = trimmedName
    }
    if (trimmedEmail && trimmedEmail !== initialForm.current.email) {
      payload.email = trimmedEmail
    }
    if (password) {
      if (password.length < 6) {
        setStatus('error')
        setErrorMessage('Le mot de passe doit contenir au moins 6 caracteres.')
        return
      }
      payload.password = password
    }

    if (Object.keys(payload).length === 0) {
      setStatus('error')
      setErrorMessage('Aucune modification a enregistrer.')
      return
    }

    const response = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      setPassword('')
      if (payload.name || payload.email) {
        initialForm.current = { name: trimmedName, email: trimmedEmail }
      }
      setStatus('success')
      return
    }

    const errorPayload = await response.json().catch(() => null)
    setStatus('error')
    setErrorMessage(errorPayload?.error || 'Impossible de mettre a jour le profil.')
  }

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setLogoStatus('saving')
    const formData = new FormData()
    formData.append('logo', file)

    const response = await fetch('/api/admin/logo', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      setLogoPreview(data.url || `/logo.png?t=${Date.now()}`)
      setLogoStatus('success')
      return
    }

    setLogoStatus('error')
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[28px] border border-white/60 bg-white/60 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Parametres
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Profil admin</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Mettez a jour vos informations et le branding du site.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <h3 className="text-xl font-semibold">Informations du compte</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Nom
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_14px_30px_rgba(15,15,15,0.12)] backdrop-blur-xl focus:border-white/80 focus:outline-none"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_14px_30px_rgba(15,15,15,0.12)] backdrop-blur-xl focus:border-white/80 focus:outline-none"
                placeholder="admin@solea.local"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Nouveau mot de passe
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_14px_30px_rgba(15,15,15,0.12)] backdrop-blur-xl focus:border-white/80 focus:outline-none"
                placeholder="********"
              />
              <p className="text-xs text-muted-foreground">
                Laissez vide pour conserver le mot de passe actuel.
              </p>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[0_18px_45px_rgba(15,15,15,0.18)] transition hover:-translate-y-0.5"
              disabled={status === 'saving'}
            >
              {status === 'saving' ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            {status === 'success' && (
              <p className="text-sm text-accent">Profil mis a jour avec succes.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-destructive">
                {errorMessage || 'Impossible de mettre a jour le profil.'}
              </p>
            )}
          </form>
        </div>

        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <h3 className="text-xl font-semibold">Logo du site</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Telechargez un nouveau logo. Il sera applique partout sur le site.
          </p>
          <div className="mt-6 rounded-[22px] border border-white/50 bg-white/60 p-6 text-center">
            <img
              src={logoPreview}
              alt="Logo actuel"
              className="mx-auto h-20 w-auto"
            />
          </div>
          <div className="mt-5 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Telecharger un logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-foreground shadow-[0_14px_30px_rgba(15,15,15,0.12)] backdrop-blur-xl"
            />
            {logoStatus === 'success' && (
              <p className="text-sm text-accent">Logo mis a jour avec succes.</p>
            )}
            {logoStatus === 'error' && (
              <p className="text-sm text-destructive">
                Impossible de mettre a jour le logo.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
