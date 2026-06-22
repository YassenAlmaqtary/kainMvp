export { isApiEnabled, getApiBaseUrl, buildApiUrl } from './config'
export { apiRequest } from './client'
export type { RequestConfig } from './client'
export { ApiError } from './errors'
export {
  SESSION_STORAGE_KEY,
  getStoredSession,
  storeSession,
  clearStoredSession,
  updateStoredTokens,
  isTokenExpired,
} from './session'
export type { StoredAuthSession } from './session'
export type {
  ApiListResponse,
  ApiResponse,
  AuthResponseDto,
  LoginRequestDto,
  ProductLookupDto,
  ProductResponseDto,
  ProductSearchResultDto,
  ProductUnitDto,
  RefreshTokenRequestDto,
  UserBranchDto,
  UserResponseDto,
} from './types'
export {
  callApi,
  resolveEndpointKey,
  getEndpointDef,
  getUiBindings,
  listEndpointsByTag,
  API_ENDPOINTS,
  WIRED_ENDPOINTS,
} from './registry/callApi'
export type { EndpointKey } from './registry/callApi'
export { UI_PAGE_BINDINGS } from './registry/wired'
export type { WiredEndpointKey } from './registry/wired'
export { mapAuthToSession, mapUserFromAuth, mapUserFromProfile } from './mappers/auth.mapper'
export { mapProductLookupToPos, mapProductResponseToPos } from './mappers/product.mapper'
