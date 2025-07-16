import { API_BASE_URL } from "../constants";
import { AgentDocument, CreateDocumentRequest } from "../types/document";

// Helper function to get auth headers
const getAuthHeaders = (token: string | null) => {
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export class DocumentService {
  static async createDocument(
    data: CreateDocumentRequest,
    token: string | null = null,
  ): Promise<AgentDocument> {
    const headers = getAuthHeaders(token);
    const response = await fetch(`${API_BASE_URL}/api/documents/`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create document");
    }

    return response.json();
  }

  static async getDocuments(
    token: string | null = null,
  ): Promise<AgentDocument[]> {
    const headers = getAuthHeaders(token);
    const response = await fetch(`${API_BASE_URL}/api/documents/`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }

    return response.json();
  }

  static async getDocument(
    id: string,
    token: string | null = null,
  ): Promise<AgentDocument> {
    const headers = getAuthHeaders(token);
    const response = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch document");
    }

    return response.json();
  }

  static async updateDocument(
    id: string,
    data: CreateDocumentRequest,
    token: string | null = null,
  ): Promise<AgentDocument> {
    const headers = getAuthHeaders(token);
    const response = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update document");
    }

    return response.json();
  }
}
