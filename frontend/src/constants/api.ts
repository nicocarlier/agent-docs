export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://agent-docs.onrender.com"
    : "http://localhost:8000";

export const API_ENDPOINTS = {
  DOCUMENTS: "/api/documents",
  DOCUMENT_BY_ID: (id: string) => `/api/documents/${id}`,
} as const;
