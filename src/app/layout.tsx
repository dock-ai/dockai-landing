import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dock AI - AI can find you. Let it act.",
  description: "The first Entity Discovery Protocol registry. Dock AI helps AI agents discover which MCP servers can interact with any business - restaurants, salons, clinics, and more.",
  keywords: ["EDP registry", "entity discovery protocol", "MCP server", "Model Context Protocol", "AI agent", "MCP discovery", "business AI", "agentic AI"],
  authors: [{ name: "Dock AI" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: "Dock AI - AI can find you. Let it act.",
    description: "The first Entity Discovery Protocol registry. Discover which MCP servers can interact with any business.",
    url: "https://dockai.co",
    siteName: "Dock AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dock AI - AI can find you. Let it act.",
    description: "The first Entity Discovery Protocol registry. Discover which MCP servers can interact with any business.",
  },
  alternates: {
    canonical: "https://dockai.co",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-zinc-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
