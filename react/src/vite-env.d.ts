interface ImportMetaEnv {
    VITE_REACT_APP_WEATHERSTACK_API_KEY: string;
    VITE_REACT_APP_LARAVEL_BASE_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  