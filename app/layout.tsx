import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Abbas Fares | Laravel Full-Stack Developer & AI Systems",
  description:
    "Professional portfolio of Abbas Fares - Laravel full-stack developer specializing in PHP, Vue, React, Next.js, and AI-powered systems with RAG and AI agents.",
  keywords: [
    "Abbas Fares",
    "VILT Stack",
    "Web Developer",
    "Full-Stack",
    "Laravel",
    "Frontend",
    "Backend",
    "React",
    "Next.js",
    "AI",
    "ML",
  ],
  authors: [{ name: "Abbas Fares" }],
  creator: "Abbas Fares",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Abbas Fares Portfolio",
    title: "Abbas Fares | Full-Stack Developer & AI",
    description:
      "Professional portfolio showcasing web development and AI/ML projects",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#021024" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        {children}
      </body>
    </html>
  );
}
