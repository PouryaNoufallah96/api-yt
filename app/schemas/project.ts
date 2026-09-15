import { z } from "zod";

export const projectDto = z.object({
  id: z.string().min(3),
  key: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  status: z.string(),
});

export const getProjectInput = projectDto.pick({ id: true });
