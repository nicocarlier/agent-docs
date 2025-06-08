import { Document, CreateDocumentRequest } from '@/types/document';
import { API_BASE_URL } from '@/constants/api';

export class DocumentService {
  static async createDocument(data: CreateDocumentRequest): Promise<Document> {
    const response = await fetch(`${API_BASE_URL}/api/documents/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create document');
    }

    return response.json();
  }

  static async getDocuments(): Promise<Document[]> {
    const response = await fetch(`${API_BASE_URL}/api/documents/`);

    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }

    return response.json();
  }

  static async getDocument(id: number): Promise<Document> {
    const response = await fetch(`${API_BASE_URL}/api/documents/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }

    return response.json();
  }
} 