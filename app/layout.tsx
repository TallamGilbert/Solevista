import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RootLayout from "@/components/layout/RootLayout";
import Providers from "@/components/layout/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Sneaqr — Premium Sneakers",
    template: "%s | Sneaqr",
  },
  description:
    "Shop premium sneakers for men and women. New drops, top brands, and exclusive releases.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
