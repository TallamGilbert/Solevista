import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Heart } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

export default async function WishlistPage() {
  const session = await auth();
  const userId = session!.user.id;

  const wishlist = await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      products: {
        include: {
          product: {
            select: {
              id: true,
              slug: true,
              name: true,
              brand: true,
              price: true,
              comparePrice: true,
              images: true,
            },
          },
        },
        orderBy: { addedAt: "desc" },
      },
    },
  });

  const items = wishlist?.products ?? [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
        <h1 className="text-xl font-black text-soft-black">Wishlist</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {items.length} saved item{items.length !== 1 ? "s" : ""}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm px-6 py-16 text-center">
          <Heart size={40} className="mx-auto text-gray-200 mb-4" />
          <p className="font-semibold text-gray-500">Your wishlist is empty</p>
          <p className="text-sm text-gray-400 mt-1">
            Tap the heart on any product to save it here
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-block px-5 py-2.5 rounded-xl bg-soft-black text-white text-sm font-semibold hover:bg-accent hover:text-soft-black transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(({ product }) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              brand={product.brand}
              price={product.price}
              comparePrice={product.comparePrice}
              image={product.images[0] ?? ""}
              wishlisted
              fullWidth
            />
          ))}
        </div>
      )}
    </div>
  );
}
