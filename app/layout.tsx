import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className={clsx("subpixel-antialiased", inter.className)}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
