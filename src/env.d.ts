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
   * Enl Module Token (eq test4c4c)
   */
  readonly VITE_MODULE_TOKEN: string
  /**
   * URL address to default module (http://localhost:8081)
   */
  readonly VITE_PORTAL_URL: string
  /**
   * Application Base URL (eq http://localhost:3333)
   */
  readonly VITE_BASE_URL: string
  /**
   * OnlyOffice API endpoint (eg http://localhost/web-apps/apps/api/documents/api.js)
   */
  readonly VITE_OO_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
