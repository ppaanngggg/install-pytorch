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
    "PyTorch Installation Tool for CUDA, ROCm, Python, OS, and Architecture",
  description:
    "PyTorch installation tool simplifies the process of setting up PyTorch with CUDA, ROCm, Python, OS, and architecture specifications.",
  verification: { google: "JXQ1K9hsRtt0tAXhGDnZ04Trr3sMBxQA-tO3T1WznzY" },
  metadataBase: new URL("https://install.pytorch.site"),
  alternates: {
    canonical: "/",
  },
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
