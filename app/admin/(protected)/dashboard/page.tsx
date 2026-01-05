import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const sourceLabel: Record<string, string> = {
  DIRECT: 'Direct',
  INSTAGRAM: 'Instagram',
  GOOGLE: 'Google',
  LINKEDIN: 'LinkedIn',
  FACEBOOK: 'Facebook',
  REFERRAL: 'Referral',
  OTHER: 'Autre',
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('fr-CH').format(value)
}

function formatPercent(value: number) {
  return `${value.toFixed(1).replace('.', ',')}%`
}

function getLast7Days() {
  const days = []
  const today = new Date()
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    date.setHours(0, 0, 0, 0)
    days.push(date)
  }
  return days
}

function buildChartPath(values: number[]) {
  const left = 10
  const right = 510
  const minY = 40
  const maxY = 150
  const step = (right - left) / (values.length - 1)
  const maxValue = Math.max(1, ...values)
  const points = values.map((value, index) => {
    const x = left + step * index
    const ratio = value / maxValue
    const y = maxY - ratio * (maxY - minY)
    return { x, y }
  })

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`)
    .join(' ')
  const areaPath = `${linePath} L ${right} ${maxY} L ${left} ${maxY} Z`
  return { points, linePath, areaPath }
}

export default async function AdminDashboardPage() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - 6)
  weekStart.setHours(0, 0, 0, 0)

  const [monthViews, monthContacts, weekViews, channelGroups] = await Promise.all([
    prisma.pageView.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.contact.count({
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.pageView.findMany({
      where: { createdAt: { gte: weekStart } },
      select: { createdAt: true },
    }),
    prisma.pageView.groupBy({
      by: ['source'],
      where: { createdAt: { gte: startOfMonth } },
      _count: { _all: true },
    }),
  ])

  const conversionRate = monthViews
    ? (monthContacts / monthViews) * 100
    : 0

  const dayBuckets = getLast7Days()
  const dayCounts = dayBuckets.map((day) => {
    const next = new Date(day)
    next.setDate(day.getDate() + 1)
    return weekViews.filter(
      (view) => view.createdAt >= day && view.createdAt < next
    ).length
  })
  const chart = buildChartPath(dayCounts)
  const dayLabels = dayBuckets.map((day) =>
    new Intl.DateTimeFormat('fr-CH', { weekday: 'short' }).format(day)
  )

  const totalChannels = channelGroups.reduce((acc, item) => acc + item._count._all, 0)
  const channels = channelGroups
    .map((item) => ({
      name: sourceLabel[item.source] ?? 'Autre',
      count: item._count._all,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
    .map((item) => ({
      name: item.name,
      percent: totalChannels ? Math.round((item.count / totalChannels) * 100) : 0,
    }))

  const kpis = [
    {
      label: 'Visites du mois',
      value: formatNumber(monthViews),
      trend: 'n/a',
    },
    {
      label: 'Leads qualifiǸs',
      value: formatNumber(monthContacts),
      trend: 'n/a',
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[28px] border border-white/60 bg-white/60 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Vue d&apos;ensemble
            </p>
            <h2 className="text-3xl font-semibold">Dashboard marketing</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Donnees statiques pour le design. Derniere mise a jour: il y a 3 minutes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium shadow-[0_18px_45px_rgba(15,15,15,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5">
              Export rapide
            </button>
            <button className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-[0_18px_45px_rgba(15,15,15,0.18)] transition hover:-translate-y-0.5">
              Generer rapport
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-[26px] border border-white/60 bg-white/60 p-5 shadow-[0_18px_45px_rgba(15,15,15,0.12)] backdrop-blur-2xl"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {kpi.label}
            </p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-2xl font-semibold">{kpi.value}</span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-foreground/70">
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Performance
              </p>
              <h3 className="text-2xl font-semibold">Engagement hebdomadaire</h3>
            </div>
            <div className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">
              7 jours
            </div>
          </div>
          <div className="mt-6 rounded-[22px] border border-white/50 bg-white/40 p-4">
            <svg viewBox="0 0 520 180" className="h-40 w-full">
              <defs>
                <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#ff6b1a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#4f6bff" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ff6b1a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#ff6b1a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={chart.linePath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={chart.areaPath}
                fill="url(#areaGradient)"
              />
              {chart.points.map((point, index) => (
                <circle
                  key={`${point.x}-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill="#111111"
                  opacity="0.2"
                />
              ))}
            </svg>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              {dayLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/60 bg-white/55 p-6 shadow-[0_20px_55px_rgba(15,15,15,0.12)] backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Sources
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Top canaux</h3>
          <div className="mt-6 space-y-4">
            {channels.length === 0 && (
              <div className="rounded-[20px] border border-white/50 bg-white/50 p-4 text-sm text-muted-foreground">
                Aucune donnee disponible pour le moment.
              </div>
            )}
            {channels.map((channel) => (
              <div key={channel.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{channel.name}</span>
                  <span className="text-muted-foreground">{channel.percent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/50">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#ff6b1a] to-[#4f6bff]"
                    style={{ width: `${channel.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
