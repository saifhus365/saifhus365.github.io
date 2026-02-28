import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Husain Saif | AI Engineer & Researcher",
  description:
    "Portfolio of Husain Saif, an AI Research ML Engineer specializing in LLM Systems, RAG, and Agentic workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-body bg-background text-foreground antialiased relative max-w-[100vw] overflow-x-hidden`}
      >
        <InteractiveBackground />

        {children}
      </body>
    </html>
  );
}
