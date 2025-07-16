"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DocumentService } from "../../../src/services/documentService";
import { AgentDocument } from "../../../src/types/document";

export default function DocumentPage() {
  const [document, setDocument] = useState<AgentDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  const documentId = params.id as string;

  console.log("documentId", documentId);

  console.log("document", document);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) {
        setError("Invalid document ID");
        setLoading(false);
        return;
      }

      try {
        const data = await DocumentService.getDocument(documentId);
        setDocument(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch document",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream text-dark-green p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-cream text-dark-green p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h2 className="font-bold">Error</h2>
            <p>{error || "Document not found"}</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-dark-green px-4 py-2 rounded hover:bg-light-green transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-dark-green p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="text-dark-green hover:text-primary transition-colors mb-4"
          >
            ← Back to Home
          </button>

          <h1 className="text-4xl font-bold text-dark-green mb-2">
            {document.title}
          </h1>

          {document.created_at && (
            <p className="text-sm text-gray-600">
              Created:{" "}
              {new Date(document.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-dark-green">
              {document.content}
            </div>
          </div>
        </div>

        {/* Document Info */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-dark-green mb-2">
            Document Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">ID:</span> {document.id}
            </div>
            <div>
              <span className="font-medium">Title Length:</span>{" "}
              {document.title.length} characters
            </div>
            <div>
              <span className="font-medium">Content Length:</span>{" "}
              {document.content.length} characters
            </div>
            {document.created_at && (
              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(document.created_at).toISOString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
