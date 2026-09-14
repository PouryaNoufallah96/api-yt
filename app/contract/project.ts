import { openapi } from '@orpc/openapi'
import { getProjectInput, projectDto } from '../schemas/project'
import { base } from './base'

export const getProject = base
  .meta(openapi({
    method: 'GET',
    path: '/projects/{id}',
    tags: ['projects'],
    summary: 'Get a project',
  }))
  .input(getProjectInput)
  .output(projectDto)
