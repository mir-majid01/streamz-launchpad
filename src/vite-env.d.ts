/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STREAMZ_APK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
