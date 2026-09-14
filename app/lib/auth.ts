export type Permission = 'issues:create'

export type SessionUser = {
  id: string
  name: string
  permissions: Permission[]
}

const usersByToken: Record<string, SessionUser> = {
  tok_ada_8f2c91e4: {
    id: 'user_demo',
    name: 'Ada Lovelace',
    permissions: ['issues:create'],
  },
  tok_bob_3a7b10d2: {
    id: 'user_bob',
    name: 'Bob',
    permissions: [],
  },
}

export function userFromAuthorization(headers: Pick<Headers, 'get'>): SessionUser | undefined {
  const header = headers.get('authorization')

  if (!header) {
    return undefined
  }

  const [scheme, token] = header.split(' ')

  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return undefined
  }

  return usersByToken[token]
}

export function hasPermission(user: SessionUser, permission: Permission): boolean {
  return user.permissions.includes(permission)
}
