"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cartCount } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-white text-soft-black">
      <Navbar cartCount={cartCount} />

      {/*
        pt-16 offsets the fixed navbar height.
        pb-16 on mobile offsets the fixed bottom nav.
      */}
      <main className="flex-1 pt-16 pb-16 md:pb-0">{children}</main>

      <Footer />
      <MobileNav cartCount={cartCount} />
      <WhatsAppFloat />
    </div>
  );
}
