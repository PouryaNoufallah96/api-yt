import * as z from "zod";

export const issueDto = z.object({
  id: z.string(),
  projectId: z.string(),
  number: z.number().int(),
  title: z.string(),
  description: z.string().nullish(),
  status: z.string(),
  priority: z.string(),
});

export const createIssueInput = issueDto
  .pick({ projectId: true, title: true, description: true })
  .extend({
    title: z.string().min(1),
    priority: z.enum(["NONE", "URGENT", "HIGH", "MEDIUM", "LOW"]).optional(),
  });
