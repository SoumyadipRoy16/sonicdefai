import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { WishlistProvider } from "@/components/wishlist-provider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoTrendAI - Discover the Next Memecoin Before It Launches",
  description:
    "Our AI scans crypto celebrities' tweets, identifies trending words with memecoin potential, and notifies you in real-time.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <WishlistProvider>
            {children}
            <Toaster />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
