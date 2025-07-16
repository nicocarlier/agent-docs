"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditorContent } from "@tiptap/react";
import { Input } from "@heroui/react";
import { DocumentService } from "../../../src/services/documentService";
import { AgentDocument } from "../../../src/types/document";
import EditorWrapper from "@/src/components/Editor/EditorWrapper";
import { useTiptapEditor } from "@/src/hooks/useTiptapEditor";
import MenuBar from "@/src/components/Editor/MenuBar";

export default function DocumentPage() {
  const [document, setDocument] = useState<AgentDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const router = useRouter();
  const editor = useTiptapEditor();

  const documentId = params.id as string;

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
        setTitle(data.title);

        // Set the editor content if editor is ready
        if (editor && data.content) {
          editor.commands.setContent(data.content);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch document",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId, editor]);

  // Update editor content when document is loaded
  useEffect(() => {
    if (editor && document?.content) {
      editor.commands.setContent(document.content);
    }
  }, [editor, document]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleSave = useCallback(async () => {
    if (!document || !editor || !document.id) return;

    setSaving(true);
    try {
      const content = editor.getHTML();
      await DocumentService.updateDocument(document.id, {
        title,
        content,
      });

      // Update local document state
      setDocument({
        ...document,
        title,
        content,
      });
    } catch (err) {
      console.error("Failed to save document:", err);
      // You might want to show a toast notification here
    } finally {
      setSaving(false);
    }
  }, [document, editor, title]);

  // Auto-save on content change (debounced)
  useEffect(() => {
    if (!editor || !document) return;

    const timeoutId = setTimeout(() => {
      handleSave();
    }, 2000); // Save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [title, handleSave]);

  // Listen to editor content changes
  useEffect(() => {
    if (!editor || !document) return;

    const handleUpdate = () => {
      const timeoutId = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timeoutId);
    };

    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, handleSave]);

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

  if (!editor) {
    return (
      <div className="min-h-screen bg-cream text-dark-green p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading editor...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-dark-green">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="text-dark-green hover:text-primary transition-colors"
            >
              ← Back to Home
            </button>

            <div className="flex items-center space-x-4">
              {saving && (
                <span className="text-sm text-gray-500">Saving...</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Input
              value={title}
              onValueChange={handleTitleChange}
              placeholder="Document title"
              className="text-2xl font-bold text-dark-green border-none bg-transparent p-0 focus:ring-0"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <EditorWrapper>
            <div className="document-content flex flex-col min-h-[11in] h-fit w-full border border-gray-300 flex-1 bg-white">
              <MenuBar editor={editor} />
              <EditorContent
                editor={editor}
                className="flex-1 overflow-y-auto min-w-[818px] max-w-[818px] w-[818px]"
              />
            </div>
          </EditorWrapper>
        </div>
      </div>
    </div>
  );
}
