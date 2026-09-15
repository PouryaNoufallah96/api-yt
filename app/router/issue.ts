import { hasPermission } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { requireAuth } from "./auth";

import { implementer } from "./implementer";

export const createIssue = implementer.issue.create
  .use(requireAuth)
  .handler(async ({ input, errors, context }) => {
    const project = await prisma.project.findUnique({
      where: { id: input.projectId },
    });

    if (!project) {
      throw errors.NOT_FOUND();
    }

    const membership = await prisma.organizationMembership.findUnique({
      where: {
        organizationId_userId: {
          organizationId: project.organizationId,
          userId: context.user.id,
        },
      },
    });

    if (!membership || !hasPermission(context.user, "issues:create")) {
      throw errors.FORBIDDEN();
    }

    return prisma.$transaction(async (tx) => {
      const next = await tx.project.update({
        where: { id: project.id },
        data: { issueCounter: { increment: 1 } },
      });

      return tx.issue.create({
        data: {
          organizationId: project.organizationId,
          projectId: project.id,
          number: next.issueCounter,
          title: input.title,
          description: input.description,
          priority: input.priority ?? "NONE",
          createdById: context.user.id,
        },
      });
    });
  });
