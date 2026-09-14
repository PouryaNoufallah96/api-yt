import * as z from 'zod'

export const projectDto = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  status: z.string(),
}).meta({ id: 'Project' })

export const getProjectInput = projectDto.pick({ id: true })
