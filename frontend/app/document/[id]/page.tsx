"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditorContent } from "@tiptap/react";
import { Input } from "@heroui/react";
import { DocumentService } from "../../../src/services/documentService";
import { AgentDocument } from "../../../src/types/document";
import EditorWrapper from "@/src/components/Editor/EditorWrapper";
import { useTiptapEditor } from "@/src/hooks/useTiptapEditor";
import MenuBar from "@/src/components/Editor/MenuBar";
import { useAuthToken } from "@/src/hooks/useAuth";

export default function DocumentPage() {
  const [document, setDocument] = useState<AgentDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { getAuthToken } = useAuthToken();
  const documentId = params.id as string;
  const editor = useTiptapEditor({
    documentId,
    token: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_TOKEN || undefined,
  });

  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) {
        setError("Invalid document ID");
        setLoading(false);
        return;
      }

      try {
        const token = await getAuthToken();
        const data = await DocumentService.getDocument(documentId, token);
        setDocument(data);
        setTitle(data.title);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch document",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId, getAuthToken]);

  // Update editor content when document is loaded and editor is ready
  useEffect(() => {
    if (editor && document?.content) {
      editor.commands.setContent(document.content);
    }
  }, [editor, document?.content]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleTitleSave = useCallback(async () => {
    if (!document || !document.id || title === document.title) return;

    setSaving(true);
    try {
      const token = await getAuthToken();
      await DocumentService.updateDocument(
        document.id,
        {
          title,
          content: document.content, // Keep existing content from database
        },
        token,
      );

      // Update local document state
      setDocument({
        ...document,
        title,
      });
    } catch (err) {
      console.error("Failed to save title:", err);
    } finally {
      setSaving(false);
    }
  }, [document, title, getAuthToken]);

  // Save title when it changes (debounced)
  useEffect(() => {
    if (!document) return;

    const timeoutId = setTimeout(() => {
      handleTitleSave();
    }, 1000); // Save title after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [title, handleTitleSave, document]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
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
      <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h2 className="font-bold">Error</h2>
            <p>{error || "Document not found"}</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="bg-green-400 text-gray-900 px-4 py-2 rounded hover:bg-green-500 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading editor...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input
              value={title}
              onValueChange={handleTitleChange}
              placeholder="Document title"
              className="text-xl font-bold text-gray-900 border-none bg-transparent p-0 focus:ring-0"
              size="lg"
            />
          </div>

          <div className="flex items-center space-x-4">
            {saving && <span className="text-sm text-gray-500">Saving...</span>}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden p-6">
        <EditorWrapper>
          <div className="document-content flex flex-col min-h-[11in] h-fit w-full border border-gray-300 flex-1 bg-white">
            <MenuBar editor={editor} />
            <EditorContent
              editor={editor}
              className="flex-1 overflow-y-auto min-w-[818px] max-w-[818px] w-[818px] px-4"
            />
          </div>
        </EditorWrapper>
      </div>
    </div>
  );
}
