# Kian ERP — API Layer

This frontend talks to **Kian ERP API** via a thin, typed HTTP client under `src/api/`.

## Quick start

1. Start the backend on `http://localhost:5000`
2. Copy `.env.example` → `.env.local` and set `VITE_USE_API=true`
3. Run `npm run dev` — Vite proxies `/api/*` to the backend (no CORS setup needed)
4. Sign in with your ERP **username** (not necessarily an email)

## Architecture

```
src/api/
├── client.ts                 # HTTP + JWT + refresh
├── index.ts                  # Public exports (callApi, types, mappers)
├── generated/
│   └── schema.d.ts           # Full OpenAPI types (auto — npm run api:types)
├── registry/
│   ├── endpoints.ts          # ALL endpoints from swagger (auto)
│   ├── wired.ts              # Endpoints linked to UI + services
│   ├── callApi.ts            # Unified caller — callApi('products.list')
│   └── types.ts              # Registry / callApi types
├── types.ts                  # DTOs for wired screens (from schema)
├── mappers/                  # DTO → app models
└── session.ts                # JWT storage
```

### Adding a new module

1. Run `npm run api:sync` (or find the key in `registry/endpoints.ts`)
2. Add service in `src/features/<domain>/services/` using `callApi('tag.action')`
3. Add hook with `useApiQuery` or `useQuery` + service
4. Register UI binding in `registry/wired.ts`

Example:

```ts
// features/inventory/services/customers.ts
export async function fetchCustomers() {
  return callApi<CustomerDto[]>('customers.list')
}

// Option A — service + useQuery (complex logic / mappers)
import { useQuery } from '@tanstack/react-query'
import { fetchCustomers } from '../services/customers'

export function useCustomers() {
  return useQuery({
    queryKey: ['customers', 'list'],
    queryFn: fetchCustomers,
  })
}

// Option B — useApiQuery (simple endpoint read)
import { useApiQuery } from '@/shared/hooks/useApiQuery'

export function useCustomersDirect() {
  return useApiQuery<CustomerDto[]>({
    queryKey: ['customers', 'list'],
    endpoint: 'customers.list',
  })
}
```

## OpenAPI / Swagger

```bash
npm run api:fetch    # saves openapi/swagger.json from the running backend
npm run api:types    # generates src/api/generated/schema.d.ts (full API schema)
npm run api:sync     # fetch + generate in one step
```

| Artifact | Description |
|----------|-------------|
| `openapi/swagger.json` | Full OpenAPI spec (~254 paths, 54 tags) |
| `src/api/generated/schema.d.ts` | Auto-generated TypeScript types for **all** endpoints & DTOs |
| `src/api/types.ts` | DTOs for wired screens (short names, derived from schema) |

When adding a new wired module, add a type alias in `src/api/types.ts`:

```ts
export type CustomerDto = Schemas['KianERPApi.DTOs.Responses.CustomerResponseDto']
```

Spec URL defaults to `http://localhost:5000/swagger/v1/swagger.json`.

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_USE_API` | `true` = real API, `false` = demo login |
| `VITE_API_URL` | Production API origin (empty in dev → use proxy) |
| `VITE_API_PROXY_TARGET` | Backend URL for Vite dev proxy |
| `VITE_SWAGGER_URL` | OpenAPI document URL |

Copy `.env.example` to `.env.local` for local development (`.env.local` is gitignored).

## Response envelope

All endpoints return:

```json
{ "success": true, "message": "...", "data": { ... }, "errors": [] }
```

The client unwraps `data` automatically and throws `ApiError` when `success` is false.

## Auth flow

- `POST /api/Auth/login` → `{ userName, password }`
- JWT stored with refresh token; auto-refresh on 401
- `POST /api/Auth/logout` on sign out
- Profile loaded via `GET /api/Users/{id}`

## POS integration

- Products loaded from `GET /api/Products` (falls back to `GET /api/Lookups/products`, then demo data)
- Product grid at bottom of POS — click to add to cart
- Barcode/SKU search via Enter or "Quick product" button
- Categories derived from product `groupName` when API data is available

## Branch selection

- Branches come from login response (`AuthResponseDto.branches`)
- `BranchProvider` + `BranchSelector` in dashboard top bar and POS header
- Changing branch calls `PUT /api/UserBranches/users/{userId}/branches/{branchId}/set-default` when API mode is on

## Unified binding (طريقة الربط الموحّدة)

Every API route is registered automatically in `src/api/registry/endpoints.ts` (381 operations).
Wired screens are declared in `src/api/registry/wired.ts`.

### Flow

```
UI (page/component)
  → hook (useApiQuery) or service (src/services/)
    → callApi('endpoint.key')
      → HTTP client (JWT, refresh, ApiResponse unwrap)
```

### Connect a new endpoint to a UI

1. Find or name the key in `generated.ts` (run `npm run api:registry` after swagger changes)
   - Examples: `products.list`, `lookups.customers`, `GET /api/Customers`
2. Add a **service** in `src/services/<domain>.ts` (business logic + mappers)
3. Add a **hook** with `useApiQuery('your.key', { select })` if the UI loads data
4. Register the binding in `src/api/registry/wired.ts`:

```ts
'customers.list': {
  ...API_ENDPOINTS['customers.list'],
  service: 'customers.fetchAll',
  ui: [{ page: 'inventory', component: 'InventoryPage', consumer: 'useCustomers' }],
},
```

5. Add the page key to `UI_PAGE_BINDINGS.inventory`

### callApi accepts three ref formats

```ts
await callApi('products.list')
await callApi('GET /api/Products')
await callApi('products.search', { query: { q: 'rice' }, params: { id: 5 } })
```

### Commands

```bash
npm run api:sync   # fetch swagger + schema.d.ts + registry
```
