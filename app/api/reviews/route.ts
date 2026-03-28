import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

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

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { productId, rating, comment } = parsed.data;

  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existing = await prisma.review.findFirst({
      where: { userId: session.user.id, productId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 409 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating,
        comment,
      },
      include: {
        user: { select: { name: true } },
      },
    });

    // Recompute and persist the product's average rating
    const { _avg } = await prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });

    if (_avg.rating !== null) {
      await prisma.product.update({
        where: { id: productId },
        data: { rating: _avg.rating },
      });
    }

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to submit review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
