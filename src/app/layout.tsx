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
  title: "Dock AI - The Action Layer for AI",
  description: "Connect your business to AI assistants. Dock AI enables restaurants, salons, clinics, and service businesses to be discovered and booked through AI agents using the Model Context Protocol (MCP).",
  keywords: ["AI booking", "MCP server", "Model Context Protocol", "AI assistant integration", "restaurant AI", "business AI", "entity discovery protocol", "agentic AI", "AI actions"],
  authors: [{ name: "Dock AI" }],
  openGraph: {
    title: "Dock AI - The Action Layer for AI",
    description: "Connect your business to AI assistants. Enable booking, ordering, and more through natural language.",
    url: "https://dockai.co",
    siteName: "Dock AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dock AI - The Action Layer for AI",
    description: "Connect your business to AI assistants. Enable booking, ordering, and more through natural language.",
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
