import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "./config";
import { headers } from "next/headers"; // ✅ Use directly in a server component
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ✅ Fetch headers directly in this server component
  const cookieHeader = (await headers()).get("cookie") || "";
  const initialState = cookieToInitialState(getConfig(), cookieHeader);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <WishlistProvider>
              {children}
              <Toaster />
            </WishlistProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
