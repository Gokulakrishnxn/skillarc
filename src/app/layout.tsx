import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { getSkillIndex } from "@/lib/skill-index";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillarc.dev"),
  title: {
    default: "Skillarc — The open skill registry for AI agents and LLMs",
    template: "%s · Skillarc",
  },
  description:
    "Browse, copy, and ship prompt templates, tool definitions, and agent workflows. The open registry for the agentic era.",
  keywords: [
    "AI agents",
    "LLM",
    "prompt templates",
    "tool definitions",
    "agent workflows",
    "GPT-4o",
    "Claude",
    "Gemini",
  ],
  openGraph: {
    title: "Skillarc — Forge your agents. Ship faster.",
    description:
      "The open registry of prompt templates, tool definitions, and agent workflows — copy, paste, ship.",
    type: "website",
    url: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const skillIndex = getSkillIndex();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        <Suspense fallback={null}>
          <Navbar skillIndex={skillIndex} />
        </Suspense>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
          }}
        />
      </body>
    </html>
  );
}
