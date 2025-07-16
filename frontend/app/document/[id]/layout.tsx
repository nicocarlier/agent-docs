"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@heroui/react";
import { DocumentService } from "../../../src/services/documentService";
import { AgentDocument } from "../../../src/types/document";

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [documents, setDocuments] = useState<AgentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const params = useParams();
  const currentDocumentId = params.id as string;

  useEffect(() => {
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

    fetchDocuments();
  }, []);

  const handleCreateDocument = async () => {
    try {
      const newDoc = await DocumentService.createDocument({
        title: "New Document",
        content: "",
      });

      if (newDoc.id) {
        router.push(`/document/${newDoc.id}`);
        // Refresh the document list
        const docs = await DocumentService.getDocuments();
        setDocuments(docs);
      }
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  };

  const handleDocumentSelect = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };

  return (
    <div className="flex h-full bg-cream">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-16"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-lg font-semibold text-dark-green">Documents</h2>
          )}
          <Button
            isIconOnly
            variant="light"
            onPress={() => setSidebarOpen(!sidebarOpen)}
            className="text-dark-green"
          >
            {sidebarOpen ? "←" : "→"}
          </Button>
        </div>

        {/* Create Document Button */}
        <div className="p-4 border-b border-gray-200">
          <Button
            color="primary"
            onPress={handleCreateDocument}
            className="w-full bg-dark-green !text-black hover:bg-primary"
            size={sidebarOpen ? "md" : "sm"}
          >
            {sidebarOpen ? "Create Document" : "+"}
          </Button>
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4">
              <div className="animate-pulse space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-2">
              {documents.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {sidebarOpen ? "No documents yet" : "..."}
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => doc.id && handleDocumentSelect(doc.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      doc.id === currentDocumentId
                        ? "bg-gray-200 text-dark-green"
                        : "hover:bg-gray-100 text-dark-green"
                    }`}
                  >
                    <div className="font-medium truncate">
                      {sidebarOpen ? doc.title : doc.title.charAt(0)}
                    </div>
                    {sidebarOpen && (
                      <div className="text-sm opacity-70 truncate">
                        {doc.content.substring(0, 50)}...
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
