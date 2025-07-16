"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentService } from "../src/services/documentService";

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

        <button
          onClick={handleCreateDocument}
          disabled={loading}
          className="cursor-pointer bg-white !text-cream px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Document"}
        </button>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-dark-green">
        <a
          className="flex items-center gap-2 text-dark-green hover:text-primary hover:underline hover:underline-offset-4 transition-colors"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 text-dark-green hover:text-primary hover:underline hover:underline-offset-4 transition-colors"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 text-dark-green hover:text-primary hover:underline hover:underline-offset-4 transition-colors"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
