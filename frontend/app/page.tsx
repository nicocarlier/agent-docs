"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DocumentService } from "../src/services/documentService";
import { Button, Spinner } from "@heroui/react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { AgentDocument } from "../src/types/document";
import { useAuthToken } from "../src/hooks/useAuth";

function LandingPage() {
  return (
    <div className="min-h-screen bg-cream text-dark-green">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-dark-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-xl font-bold text-dark-green">
              Agent Docs
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <SignInButton mode="modal">
              <Button
                variant="light"
                className="text-dark-green hover:bg-light-green"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                color="primary"
                className="bg-dark-green text-white hover:bg-primary"
              >
                Get Started
              </Button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-dark-green mb-6">
            Collaborative Document Editing
            <span className="block text-3xl md:text-4xl font-normal text-gray-600 mt-2">
              Built for Teams
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create, edit, and collaborate on documents in real-time with your
            team. Experience seamless collaboration with our powerful editor
            powered by TipTap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button
                color="primary"
                size="lg"
                className="bg-dark-green text-white hover:bg-primary px-8 py-4 text-lg"
              >
                Start Writing Today
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button
                variant="bordered"
                size="lg"
                className="border-dark-green text-dark-green hover:bg-light-green px-8 py-4 text-lg"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-green text-center mb-12">
            Why Choose Agent Docs?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-dark-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-green mb-2">
                Real-time Collaboration
              </h3>
              <p className="text-gray-600">
                Work together with your team in real-time. See changes as they
                happen with live cursors and instant updates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-dark-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-green mb-2">
                Rich Text Editing
              </h3>
              <p className="text-gray-600">
                Powerful editor with formatting options, lists, headings, and
                more. Create professional documents with ease.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-dark-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark-green mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your documents are secure and private. Built with modern
                authentication and data protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-light-green">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-dark-green mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of teams who are already collaborating on Agent Docs.
          </p>
          <SignUpButton mode="modal">
            <Button
              color="primary"
              size="lg"
              className="bg-dark-green text-white hover:bg-primary px-8 py-4 text-lg"
            >
              Create Your First Document
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">
            © 2024 Agent Docs. Built with Next.js, FastAPI, and TipTap.
          </p>
        </div>
      </footer>
    </div>
  );
}

function DocumentList() {
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
            className="bg-dark-green text-white hover:bg-primary"
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
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <DocumentList />
      </SignedIn>
    </>
  );
}
