import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Providers from "./providers";
import "./styles/globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* Top Navbar */}
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
              </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
