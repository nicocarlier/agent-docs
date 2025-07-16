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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-dark-green">
                  <div className="w-8 h-8 bg-dark-green rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AD</span>
                  </div>
                  <span className="font-bold text-lg">Agent Docs</span>
                </div>
                <div className="flex items-center space-x-4">
                  <SignInButton mode="modal">
                    <button className="text-dark-green hover:text-primary transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-dark-green text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </header>
          </SignedOut>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </Providers>
    </html>
  );
}
