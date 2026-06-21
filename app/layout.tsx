import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Startup Co-Founder | Transform Ideas into Business Plans",
  description:
    "AI-powered startup advisor that generates comprehensive business plans, SWOT analysis, MVP roadmaps, and investor-ready pitch decks in minutes.",
  keywords: [
    "startup",
    "AI",
    "business plan",
    "pitch deck",
    "SWOT analysis",
    "MVP roadmap",
    "co-founder",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark h-full antialiased ${inter.variable}`}>
      <body className={`${inter.className} min-h-full bg-background text-foreground`}>
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
