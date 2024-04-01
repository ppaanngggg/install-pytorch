import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/app/header";
import Footer from "@/app/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Install PyTorch: Target CUDA, ROCm, or CPU on Linux, Windows, or MacOS (arm64/x86_64) with Supported Python Versions",
  description:
    "Super easy finder to help you install the right PyTorch version for your CUDA, ROCm, or CPU on Linux, Windows, or MacOS (arm64/x86_64) with supported Python versions.",
  verification: { google: "JXQ1K9hsRtt0tAXhGDnZ04Trr3sMBxQA-tO3T1WznzY" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className={clsx("subpixel-antialiased", inter.className)}>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
