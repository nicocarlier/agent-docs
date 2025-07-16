"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DocumentService } from "../services/documentService";
import { AgentDocument } from "../types/document";
import { useAuthToken } from "../hooks/useAuth";
import WelcomePage from "./WelcomePage";
import MainButton from "./common/MainButton";

export default function DocumentList() {
  const [documents, setDocuments] = useState<AgentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const { getAuthToken } = useAuthToken();

  const fetchDocuments = async () => {
    try {
      const token = await getAuthToken();
      const docs = await DocumentService.getDocuments(token);
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDocument = async () => {
    setCreating(true);
    try {
      const token = await getAuthToken();
      const newDoc = await DocumentService.createDocument(
        {
          title: "New Document",
          content: "Start writing your document here...",
        },
        token,
      );

      if (newDoc.id) {
        router.push(`/document/${newDoc.id}`);
      }
    } catch (error) {
      console.error("Failed to create document:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleDocumentSelect = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };

  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  }, [getAuthToken]);

  // Show welcome page for empty state
  if (!loading && documents.length === 0) {
    return <WelcomePage />;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Documents</h1>
          <MainButton
            title="Create Document"
            handleEvent={handleCreateDocument}
            isLoading={creating}
            type="primary"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 shadow-sm animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => doc.id && handleDocumentSelect(doc.id)}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2 truncate">
                  {doc.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {doc.content || "No content yet..."}
                </p>
                {doc.created_at && (
                  <p className="text-xs text-gray-500">
                    Created {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
