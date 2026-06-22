import type { AuthResponseDto, UserResponseDto } from '@/api/types'
import type { StoredAuthSession } from '@/api/session'
import type { User } from '@/shared/types/user'

export function mapUserFromAuth(dto: AuthResponseDto): User {
  return {
    id: String(dto.userId),
    name: dto.userName ?? '',
    email: dto.userName ?? '',
    role: dto.roleId != null ? String(dto.roleId) : dto.isSuperUser ? 'super' : 'user',
  }
}

export function mapUserFromProfile(dto: UserResponseDto): User {
  return {
    id: String(dto.userId ?? ''),
    name: dto.fullName ?? dto.userName ?? '',
    email: dto.email ?? dto.userName ?? '',
    role: 'user',
  }
}

export function mapAuthToSession(dto: AuthResponseDto): StoredAuthSession {
  if (!dto.token || !dto.refreshToken || dto.userId == null || !dto.tokenExpiration) {
    throw new Error('AUTH_TOKEN_MISSING')
  }

  return {
    user: mapUserFromAuth(dto),
    token: dto.token,
    refreshToken: dto.refreshToken,
    tokenExpiration: dto.tokenExpiration,
    userId: dto.userId,
    roleId: dto.roleId,
    defaultBranchId: dto.defaultBranchId,
    branches: dto.branches ?? undefined,
    isSuperUser: dto.isSuperUser,
  }
}
