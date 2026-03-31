import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayout from "@/components/layout/RootLayout";
import Providers from "@/components/layout/Providers";
import { Playfair_Display } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Solévista — Premium Footwear Kenya",
    template: "%s | Sneaqr",
  },
  description:
    "Shop premium authentic footwear in Kenya. New arrivals, top brands, and exclusive styles for every occasion.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
