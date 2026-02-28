import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

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
        {/* Animated Background layer */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/20 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-secondary/15 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDelay: '-10s' }}></div>
        </div>

        {children}
      </body>
    </html>
  );
}
