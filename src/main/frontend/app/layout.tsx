import type { Metadata } from "next";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/app/providers";
import { NavBar } from "@/components/navbar";

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
    <html className="light" lang="en">
      <head>
        <title>Retro Store</title>
        <meta content="#fd9a00" name="theme-color" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NavBar />
          <main className="flex justify-center min-h-screen min-w-full bg-amber-500 font-sans">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
