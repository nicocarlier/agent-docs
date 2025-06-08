'use client';

import { useEffect, useState } from 'react';
import { DocumentService } from '../services/documentService';
import { AgentDocument } from '../types/document';

export default function DocumentList() {
  const [documents, setDocuments] = useState<AgentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await DocumentService.getDocuments();
        setDocuments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div className="p-4">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
      {documents.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{doc.title}</h3>
              <p className="text-gray-700 mt-2">{doc.content}</p>
              {doc.created_at && (
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(doc.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 