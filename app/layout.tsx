import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      </body>
      <GoogleAnalytics gaId="G-VBHNCSFL4Y" />
    </html>
  );
}
