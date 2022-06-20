/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Application Title (eq [LOCALHOST] MyApp)
   */
  readonly VITE_APP_TITLE: string
  /**
   * Application Token for backend identification (eq anything123)
   */
  readonly VITE_APP_TOKEN: string
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
