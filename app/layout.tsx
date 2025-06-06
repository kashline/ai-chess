import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/app/ui/Topbar";
import { Providers } from "@/app/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AuthSync from "@/app/util/AuthSync";
import { SessionProvider } from "next-auth/react";
import CreateUsernameBanner from "@/app/ui/CreateUsernameBanner";
import BottomBar from "@/app/ui/BottomBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chess",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <SessionProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Topbar />
            <CreateUsernameBanner />
            <div style={{ minHeight: "calc(100vh - 100px)" }}>{children}</div>
            <Analytics />
            <SpeedInsights />
            <AuthSync />
            <BottomBar />
          </body>
        </SessionProvider>
      </Providers>
    </html>
  );
}
