/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Application Title (eq [LOCALHOST] PagBe)
   */
  readonly VITE_APP_TITLE: string
  /**
   * API Endpoint (eq http://localhost:1337)
   */
  readonly VITE_API_ENDPOINT: string
  /**
   * Application Base URL (eq http://localhost:3333)
   */
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
