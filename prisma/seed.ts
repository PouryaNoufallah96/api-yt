import 'dotenv/config'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../lib/db/generated/client'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const organization = await prisma.organization.upsert({
    where: { id: 'org_demo' },
    update: {},
    create: {
      id: 'org_demo',
      kindeOrgCode: 'org_demo',
      name: 'Demo',
    },
  })

  const user = await prisma.user.upsert({
    where: { id: 'user_demo' },
    update: {},
    create: {
      id: 'user_demo',
      kindeUserId: 'kp_demo',
      name: 'Ada Lovelace',
    },
  })

  const bob = await prisma.user.upsert({
    where: { id: 'user_bob' },
    update: {},
    create: {
      id: 'user_bob',
      kindeUserId: 'kp_bob',
      name: 'Bob',
    },
  })

  await prisma.organizationMembership.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      userId: user.id,
    },
  })

  await prisma.organizationMembership.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: bob.id,
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      userId: bob.id,
    },
  })

  await prisma.project.upsert({
    where: { id: 'proj_demo' },
    update: {},
    create: {
      id: 'proj_demo',
      organizationId: organization.id,
      key: 'ENG',
      name: 'Engineering',
      description: 'Product engineering',
      createdById: user.id,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
