"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "@/src/components/LandingPage";
import DocumentList from "@/src/components/DocumentList";

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
