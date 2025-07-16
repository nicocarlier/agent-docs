import { API_BASE_URL } from "../constants";
import { AgentDocument, CreateDocumentRequest } from "../types/document";

export class DocumentService {
  static async createDocument(
    data: CreateDocumentRequest,
  ): Promise<AgentDocument> {
    const response = await fetch(`${API_BASE_URL}/api/documents/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create document");
    }

    return response.json();
  }

  static async getDocuments(): Promise<AgentDocument[]> {
    const response = await fetch(`${API_BASE_URL}/api/documents/`);

    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }

    return response.json();
  }

  static async getDocument(id: string): Promise<AgentDocument> {
    const response = await fetch(`${API_BASE_URL}/api/documents/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch document");
    }

    return response.json();
  }

  static async updateDocument(
    id: string,
    data: CreateDocumentRequest,
  ): Promise<AgentDocument> {
    const response = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update document");
    }

    return response.json();
  }
}
