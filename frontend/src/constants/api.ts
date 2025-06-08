export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com' 
  : 'http://localhost:8000';

export const API_ENDPOINTS = {
  DOCUMENTS: '/api/documents',
  DOCUMENT_BY_ID: (id: number) => `/api/documents/${id}`,
} as const; 