import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "UIForge.dev - Master Production-grade UI Patterns",
  description: "Prototype, preview, and reuse high-quality UI patterns with production-grade React architecture. Built for senior frontend engineers.",
  keywords: ["Next.js", "React", "SaaS", "Tailwind CSS", "UI Components", "Frontend Architecture"],
  authors: [{ name: "UIForge Team" }],
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192x192.png",
  },
  openGraph: {
    title: "UIForge.dev",
    description: "Build beautiful UI components faster.",
    url: "https://uiforge.dev",
    siteName: "UIForge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
