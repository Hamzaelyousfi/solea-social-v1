import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

const adminEmail = process.env.ADMIN_EMAIL || 'amandinelydia.veillard@gmail.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'GM5C2GS5ZA2Q'

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  const existing = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  })

  if (existing) {
    console.log(`Admin already exists: ${adminEmail}`)
    return
  }

  const passwordHash = hashPassword(adminPassword)

  await prisma.adminUser.create({
    data: {
      email: adminEmail,
      name: 'Admin',
      passwordHash,
    },
  })

  console.log(`Admin created: ${adminEmail}`)
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
