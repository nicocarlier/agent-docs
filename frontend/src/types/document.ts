export interface Document {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
}

export interface CreateDocumentRequest {
  title: string;
  content: string;
}

export interface DocumentListResponse {
  documents: Document[];
} 