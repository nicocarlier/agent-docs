"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentService } from "../src/services/documentService";
import { Button, Spinner } from "@heroui/react";

export default function Home() {
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
      // You could add error state handling here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-cream text-dark-green">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-dark-green">Agent Docs</h1>

        <Button
          color="primary"
          onPress={handleCreateDocument}
          isLoading={loading}
          spinner={<Spinner size="sm" />}
          className="cursor-pointer bg-white !text-cream px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Document
        </Button>
      </main>
    </div>
  );
}
