import { ratelimit } from '@orpc/ratelimit'
import { MemoryRateLimiter } from '@orpc/ratelimit/memory'
import type { AppContext } from './implementer'

export const limiter = new MemoryRateLimiter({
  maxRequests: 10,
  window: 60_000,
})

export const rateLimit = ratelimit<AppContext, unknown>({
  limiter: () => limiter,
  key: ({ context }) => {
    const forwarded = context.headers.get('x-forwarded-for')

    return forwarded?.split(',')[0]?.trim()
      ?? context.headers.get('x-real-ip')
      ?? 'anonymous'
  },
})
