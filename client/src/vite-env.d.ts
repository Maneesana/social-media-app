// eslint-disable-next-line spaced-comment
///<reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_BASE_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
