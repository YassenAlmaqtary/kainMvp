/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_API?: string
  readonly VITE_API_URL?: string
  readonly VITE_API_PROXY_TARGET?: string
  readonly VITE_SWAGGER_URL?: string
  readonly VITE_GOOGLE_CLIENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
