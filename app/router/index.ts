import { implementer } from './implementer'
import { getProject } from './project'
import { rateLimit } from './rate-limit'

export const router = implementer.use(rateLimit).router({
  project: {
    get: getProject,
  },
})
