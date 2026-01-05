import { prisma } from '@/lib/prisma'
import AdminMessagesClient from '@/components/admin/messages-client'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return <AdminMessagesClient contacts={contacts} />
}
