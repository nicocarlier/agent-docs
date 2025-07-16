"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DocumentService } from "../src/services/documentService";
import { Button, Spinner } from "@heroui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { AgentDocument } from "../src/types/document";

function WelcomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateDocument = async () => {
    setLoading(true);
    try {
      const newDoc = await DocumentService.createDocument({
        title: "New Document",
        content: "Start writing your document here...",
      });

      if (newDoc.id) {
        router.push(`/document/${newDoc.id}`);
      }
    } catch (error) {
      console.error("Failed to create document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-cream text-dark-green">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-dark-green mb-4">
            Welcome to Agent Docs
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create, edit, and collaborate on documents in real-time with your
            team.
          </p>
        </div>

        <Button
          color="primary"
          onPress={handleCreateDocument}
          isLoading={loading}
          spinner={<Spinner size="sm" />}
          className="cursor-pointer bg-dark-green text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Your First Document
        </Button>
      </main>
    </div>
  );
}

function DocumentList() {
  const [documents, setDocuments] = useState<AgentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const fetchDocuments = async () => {
    try {
      const docs = await DocumentService.getDocuments();
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
      const newDoc = await DocumentService.createDocument({
        title: "New Document",
        content: "Start writing your document here...",
      });

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
  }, []);

  return (
    <div className="p-8 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-dark-green">Your Documents</h1>
          <Button
            color="primary"
            onPress={handleCreateDocument}
            isLoading={creating}
            spinner={<Spinner size="sm" />}
            className="bg-dark-green text-black hover:bg-primary"
          >
            Create Document
          </Button>
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
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No documents yet</div>
            <Button
              color="primary"
              onPress={handleCreateDocument}
              className="bg-dark-green text-white hover:bg-primary"
            >
              Create Your First Document
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => doc.id && handleDocumentSelect(doc.id)}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                <h3 className="font-semibold text-dark-green mb-2 truncate">
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

export default function Home() {
  return (
    <>
      <SignedOut>
        <WelcomePage />
      </SignedOut>
      <SignedIn>
        <DocumentList />
      </SignedIn>
    </>
  );
}
