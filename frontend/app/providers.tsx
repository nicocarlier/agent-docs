import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <HeroUIProvider>
        <ToastProvider placement="bottom-right" toastOffset={10} />
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </div>
      </HeroUIProvider>
    </ClerkProvider>
  );
}
