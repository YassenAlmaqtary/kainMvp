# Project Architecture

Feature-based structure with a shared infrastructure layer. UI stays in components; business logic lives in services, hooks, and context.

## Folder layout

```
src/
├── app/                    # Bootstrap & routing shell
│   ├── App.tsx
│   ├── providers.tsx       # Global React providers
│   ├── routes.tsx          # Route definitions
│   └── layouts/RootLayout.tsx
├── features/               # Domain modules (vertical slices)
│   ├── auth/               # Login, guards, auth services
│   ├── dashboard/          # ERP dashboard
│   └── pos/                # Point of sale
├── shared/                 # Cross-feature reusable code
│   ├── api/                # (re-exported via @/api at src/api)
│   ├── components/         # BranchSelector, LanguageSwitcher, …
│   ├── context/            # Auth, Branch, Theme
│   ├── hooks/              # useLanguage, useLogout, useApiQuery, useApiMutation
│   ├── api/                # queryClient, queryKeys
│   ├── i18n/
│   ├── theme/
│   ├── types/
│   ├── ui/                 # Button, Input, Logo
│   └── utils/
├── api/                    # HTTP client + OpenAPI registry
├── styles/
├── main.tsx
└── index.css
```

## Layer rules

| Layer | Responsibility | Example |
|-------|----------------|---------|
| **pages** | Route entry, compose feature UI | `DashboardPage.tsx` |
| **components** | Presentational UI only | `DashboardHero.tsx` |
| **hooks** | Component-level logic, data fetching | `usePosProducts`, `useApiQuery` |
| **context** | Shared state for a feature or app | `PosCartContext` |
| **services** | API calls + business rules | `auth.ts`, `products.ts` |
| **api/** | Transport, tokens, endpoint registry | `callApi('auth.login')` |

## Data fetching (TanStack Query)

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Component  │ ──► │ useQuery /   │ ──► │  service    │ ──► callApi
│             │     │ useMutation  │     │  (features) │
└─────────────┘     └──────────────┘     └─────────────┘
```

| Operation | Pattern | Example |
|-----------|---------|---------|
| **Read** | `useQuery` + service | `usePosProducts` |
| **Read (simple)** | `useApiQuery` | `endpoint: 'customers.list'` |
| **Write** | `useApiMutation` | `endpoint: 'products.create'` |
| **Auth** | `useAuthSession` | login/logout/current user |

Import helpers from `@/shared/api` (`queryKeys`, `useApiQuery`, `useApiMutation`).

**Do not** use `useEffect` + `fetch` for server data in components.

## Adding a feature

1. Create `src/features/<name>/` with `components/`, `pages/`, optional `hooks/`, `services/`, `context/`.
2. Register routes in `app/routes.tsx`.
3. Wire API in `api/registry/wired.ts` if needed.
4. Add DTO aliases in `api/types.ts` for typed responses.

## Import conventions

```ts
import { callApi } from '@/api'
import { useAuth } from '@/shared/context/AuthContext'
import { useLogout } from '@/shared/hooks/useLogout'
import { LoginForm } from '@/features/auth/components/LoginForm'
import type { User } from '@/shared/types/user'
```

## Deleted / consolidated

- `MainLayout`, `MainHeader` — unused legacy shell
- `useApiQuery` — unused (use feature hooks or add TanStack Query later)
- Duplicate logout handlers → `useLogout()`
- Duplicate click-outside → `useClickOutside()`
- Split `types/` → `shared/types/user.ts` + `features/*/types.ts`
