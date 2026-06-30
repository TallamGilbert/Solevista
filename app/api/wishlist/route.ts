import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const productSchema = z.object({
  productId: z.string().min(1),
});

async function getOrCreateWishlist(userId: string) {
  return prisma.wishlist.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.user.id },
      include: {
        products: {
          include: {
            product: { include: { sizes: true } },
          },
          orderBy: { addedAt: "desc" },
        },
      },
    });

    return NextResponse.json(wishlist ?? { products: [] });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch wishlist";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { productId } = parsed.data;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const wishlist = await getOrCreateWishlist(session.user.id);

    await prisma.wishlistProduct.upsert({
      where: {
        wishlistId_productId: { wishlistId: wishlist.id, productId },
      },
      create: { wishlistId: wishlist.id, productId },
      update: {},
    });

    return NextResponse.json({ message: "Added to wishlist" }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update wishlist";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { productId } = parsed.data;

  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.user.id },
    });

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 },
      );
    }

    await prisma.wishlistProduct.delete({
      where: {
        wishlistId_productId: { wishlistId: wishlist.id, productId },
      },
    });

    return NextResponse.json({ message: "Removed from wishlist" });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update wishlist";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
