import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { NavBar } from "@/components/navbar";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin" as const],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin" as const],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description: "A storefront for all your retro needs",
  title: "Retro Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <NavBar />
        <main className="flex justify-center min-h-screen min-w-full bg-amber-500 font-sans">
          {children}
        </main>
      </body>
    </html>
  );
}
