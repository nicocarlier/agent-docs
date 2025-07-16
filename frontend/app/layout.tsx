import type { Metadata } from "next";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Providers from "./providers";
import "./styles/globals.css";
import { Button } from "@heroui/react";

export const metadata: Metadata = {
  title: "Agent Docs",
  description: "Collaborative document editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Top Navbar - Only show when signed in */}
            <SignedIn>
              <nav className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 text-dark-green hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 bg-dark-green rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AD</span>
                    </div>
                    <span className="font-bold text-lg">Agent Docs</span>
                  </Link>
                  <UserButton />
                </div>
              </nav>
            </SignedIn>

            {/* Auth Header - Only show when signed out */}
            <SignedOut>
              <header className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2">
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
                        Get Started
                      </Button>
                    </SignInButton>
                  </div>
                </div>
              </header>
            </SignedOut>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
