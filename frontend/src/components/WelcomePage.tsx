"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import { DocumentService } from "../services/documentService";
import { useAuthToken } from "../hooks/useAuth";

export default function WelcomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { getAuthToken } = useAuthToken();

  const handleCreateDocument = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50 text-gray-900">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
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
          className="cursor-pointer !bg-black text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:!bg-gray-800"
        >
          Create Your First Document
        </Button>
      </main>
    </div>
  );
}
