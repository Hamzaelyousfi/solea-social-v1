export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f1ea] text-foreground">
      <div className="pointer-events-none absolute -top-48 right-[-20%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,26,0.35),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-56 left-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(90,120,255,0.25),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent_35%,rgba(255,255,255,0.15))]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        {children}
      </div>
    </div>
  )
}
