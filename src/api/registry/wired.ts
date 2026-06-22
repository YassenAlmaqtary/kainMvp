import type { WiredEndpoint } from '@/api/registry/types'
import { API_ENDPOINTS } from '@/api/registry/endpoints'

/**
 * Endpoints explicitly wired to UI + services.
 * When connecting a new screen: add an entry here (alias a registry key + ui[]).
 */
export const WIRED_ENDPOINTS = {
  'auth.login': {
    ...API_ENDPOINTS['auth.login'],
    service: 'auth.loginWithApi',
    ui: [{ page: 'login', component: 'LoginForm', consumer: 'AuthContext.login → callApi(auth.login)' }],
  },
  'auth.refreshToken': {
    ...API_ENDPOINTS['auth.refreshToken'],
    service: 'api.client.refreshAccessToken',
    ui: [],
  },
  'auth.logout': {
    ...API_ENDPOINTS['auth.logout'],
    service: 'auth.logout',
    ui: [{ page: 'dashboard', component: 'DashboardTopBar', consumer: 'AuthContext.logout' }],
  },
  'users.getById': {
    ...API_ENDPOINTS['users.getById'],
    service: 'auth.getCurrentUser',
    ui: [{ page: 'dashboard', component: 'DashboardTopBar', consumer: 'AuthContext' }],
  },
  'products.list': {
    ...API_ENDPOINTS['products.list'],
    service: 'products.fetchPosProducts',
    ui: [
      { page: 'pos', component: 'PosProductGrid', consumer: 'usePosProducts' },
      { page: 'pos', component: 'PosMainPanel', consumer: 'usePosProducts' },
    ],
  },
  'products.search': {
    ...API_ENDPOINTS['products.search'],
    service: 'products.searchPosProducts',
    ui: [{ page: 'pos', component: 'PosCatalogSearch', consumer: 'PosMainPanel' }],
  },
  'lookups.products': {
    ...API_ENDPOINTS['lookups.products'],
    service: 'products.fetchPosProducts (fallback)',
    ui: [
      {
        page: 'pos',
        component: 'PosProductGrid',
        consumer: 'usePosProducts',
        notes: 'Fallback when products.list fails',
      },
    ],
  },
  'userBranches.setDefault': {
    ...API_ENDPOINTS['userBranches.setDefault'],
    service: 'BranchContext.setActiveBranchId',
    ui: [
      { page: 'dashboard', component: 'BranchSelector', consumer: 'BranchContext' },
      { page: 'pos', component: 'BranchSelector', consumer: 'BranchContext' },
    ],
  },
} as const satisfies Record<string, WiredEndpoint>

export type WiredEndpointKey = keyof typeof WIRED_ENDPOINTS

/** Quick lookup: page route → wired endpoint keys */
export const UI_PAGE_BINDINGS = {
  login: ['auth.login'],
  dashboard: ['auth.logout', 'users.getById', 'userBranches.setDefault'],
  pos: ['products.list', 'products.search', 'lookups.products', 'userBranches.setDefault'],
  reports: [],
  inventory: [],
  settings: [],
} as const satisfies Record<string, readonly WiredEndpointKey[]>
