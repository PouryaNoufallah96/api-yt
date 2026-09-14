import { prisma } from '../lib/prisma'
import { implementer } from './implementer'

export const getProject = implementer.project.get.handler(async ({ input, errors }) => {
  const project = await prisma.project.findUnique({
    where: { id: input.id },
  })

  if (!project) {
    throw errors.NOT_FOUND()
  }

  return project
})
