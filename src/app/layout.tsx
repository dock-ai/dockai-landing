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
  title: "Dock AI - Entity Discovery for AI Agents",
  description: "Discover which MCP servers can interact with any business. The first Entity Discovery Protocol registry.",
  openGraph: {
    title: "Dock AI - Entity Discovery for AI Agents",
    description: "Discover which MCP servers can interact with any business.",
    url: "https://dockai.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
