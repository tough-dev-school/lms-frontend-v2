// Read lazily, the dev server loads this module before Vite fills process.env from .env files
export const getApiUrl = () => process.env.API_URL ?? 'http://127.0.0.1:8000';

export const isProduction = () => process.env.NODE_ENV === 'production';
