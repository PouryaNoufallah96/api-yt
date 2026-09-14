import { oc } from '@orpc/contract'

export const base = oc.errors({
  BAD_REQUEST: {
    message: 'The request is invalid',
  },
  UNAUTHORIZED: {
    message: 'Authentication is required',
  },
  FORBIDDEN: {
    message: 'You do not have access to this resource',
  },
  NOT_FOUND: {
    message: 'The resource was not found',
  },
  CONFLICT: {
    message: 'The resource already exists',
  },
  TOO_MANY_REQUESTS: {
    message: 'Too many requests',
  },
})
