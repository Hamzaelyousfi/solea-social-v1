'use client'

import { useMemo, useState } from 'react'
import type { Contact, ContactStatus } from '@prisma/client'

type ContactWithDates = Omit<Contact, 'createdAt' | 'updatedAt'> & {
  createdAt: string | Date
  updatedAt: string | Date
}

const statusStyle: Record<ContactStatus, string> = {
  NEW: 'bg-[#ff6b1a]/15 text-[#d24f0c]',
  IN_PROGRESS: 'bg-[#4f6bff]/15 text-[#3b4fe0]',
  FOLLOW_UP: 'bg-[#ffd166]/35 text-[#9a6a00]',
  ARCHIVED: 'bg-black/10 text-foreground/70',
}

const statusLabel: Record<ContactStatus, string> = {
  NEW: 'Nouveau',
  IN_PROGRESS: 'En cours',
  FOLLOW_UP: 'A rappeler',
  ARCHIVED: 'Archive',
}

const statusOptions: ContactStatus[] = ['NEW', 'IN_PROGRESS', 'FOLLOW_UP', 'ARCHIVED']

function formatDate(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('fr-CH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function timeAgo(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value
  const diffMs = Date.now() - date.getTime()
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000))
  if (diffMinutes < 60) {
    return `message recu il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
  }
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) {
    return `message recu il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
  }
  const diffDays = Math.floor(diffHours / 24)
  return `message recu il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
}

async function updateStatus(id: string, status: ContactStatus) {
  const response = await fetch(`/api/contacts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Failed to update status')
  }
}

export default function AdminMessagesClient({ contacts }: { contacts: ContactWithDates[] }) {
  const [items, setItems] = useState<ContactWithDates[]>(contacts)
  const [selectedId, setSelectedId] = useState<string | null>(
    contacts[0]?.id ?? null
  )
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  )

  const handleStatusChange = async (status: ContactStatus) => {
    if (!selected) return
    setIsUpdating(true)
    setError(null)
    setSuccess(null)
    try {
      await updateStatus(selected.id, status)
      setItems((prev) =>
        prev.map((item) =>
          item.id === selected.id ? { ...item, status } : item
        )
      )
      setSuccess('Statut change avec succes.')
    } catch (err) {
      setError('Impossible de modifier le statut pour le moment.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[28px] border border-white/60 bg-white/60 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Messages contact
            </p>
            <h2 className="text-3xl font-semibold">Boite de reception</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Vue en temps reel des demandes recuees depuis le site.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Messages recents</h3>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {items.length} demandes
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {items.length === 0 && (
              <div className="rounded-[22px] border border-white/50 bg-white/50 p-6 text-sm text-muted-foreground">
                Aucun message pour le moment.
              </div>
            )}
            {items.map((message) => {
              const isActive = message.id === selectedId
              return (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => setSelectedId(message.id)}
                  className={[
                    'w-full text-left rounded-[22px] border p-4 transition',
                    isActive
                      ? 'border-white/80 bg-white/70 shadow-[0_18px_45px_rgba(15,15,15,0.14)]'
                      : 'border-white/50 bg-white/50 hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{message.name}</p>
                      <p className="text-xs text-muted-foreground">{message.email}</p>
                    </div>
                    <span
                      className={[
                        'rounded-full px-3 py-1 text-xs font-semibold',
                        statusStyle[message.status],
                      ].join(' ')}
                    >
                      {statusLabel[message.status]}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {message.subject || 'Demande de contact'}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {message.message.slice(0, 140)}
                    {message.message.length > 140 ? '...' : ''}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Apercu
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Message selectionne</h3>
          {!selected ? (
            <div className="mt-6 rounded-[22px] border border-white/50 bg-white/55 p-5 text-sm text-muted-foreground">
              Aucun message selectionne.
            </div>
          ) : (
            <div className="mt-6 space-y-5 rounded-[22px] border border-white/50 bg-white/55 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{selected.name}</p>
                  <p className="text-xs text-muted-foreground">{selected.email}</p>
                </div>
                <span
                  className={[
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    statusStyle[selected.status],
                  ].join(' ')}
                >
                  {statusLabel[selected.status]}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Sujet
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {selected.subject || 'Demande de contact'}
                </p>
              </div>
              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Entreprise
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {selected.company || 'Non renseigne'}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Type de projet
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {selected.projectType || 'Non renseigne'}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Budget
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {selected.budget || 'Non renseigne'}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Date de creation
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {formatDate(selected.createdAt)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {timeAgo(selected.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Message
                </p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {selected.message}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Statut
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {statusOptions.map((status) => {
                    const isActive = selected.status === status
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusChange(status)}
                        disabled={isUpdating}
                        className={[
                          'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition',
                          isActive
                            ? 'border-white/80 bg-white/80 text-foreground'
                            : 'border-white/50 bg-white/50 text-foreground/70 hover:border-white/80 hover:bg-white/70',
                        ].join(' ')}
                      >
                        {statusLabel[status]}
                      </button>
                    )
                  })}
                </div>
                {isUpdating && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Mise a jour en cours...
                  </p>
                )}
                {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
              </div>
            </div>
          )}
          <div className="mt-6 rounded-[20px] border border-white/50 bg-white/50 p-4 text-sm text-muted-foreground">
            {success && <span className="text-accent">{success}</span>}
            {error && <span className="text-destructive">{error}</span>}
            {!success && !error && 'Statut synchronise avec la base de donnees en direct.'}
          </div>
        </div>
      </section>
    </div>
  )
}
