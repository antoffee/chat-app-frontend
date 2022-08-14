declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
        readonly BACKEND_URL: string;
        readonly HOST: string;
        readonly APP_PATH: string;
    }
}
