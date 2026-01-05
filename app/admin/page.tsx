import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth'

export default async function AdminIndexPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (session && (await verifyAdminSession(session))) {
    redirect('/admin/dashboard')
  }
  redirect('/admin/login')
}
