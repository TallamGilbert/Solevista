import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

interface RootLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
}

export default function RootLayout({ children, cartCount = 0 }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-soft-black">
      <Navbar cartCount={cartCount} />

      {/*
        pt-16 offsets the fixed navbar height.
        pb-16 on mobile offsets the fixed bottom nav.
      */}
      <main className="flex-1 pt-16 pb-16 md:pb-0">
        {children}
      </main>

      <Footer />
      <MobileNav cartCount={cartCount} />
    </div>
  );
}
