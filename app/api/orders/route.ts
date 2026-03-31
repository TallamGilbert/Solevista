import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().optional(),
        sizeId: z.string().optional(),
        sizeLabel: z.string().optional(),
        quantity: z.number().int().min(1),
        price: z.number().positive(),
      })
    )
    .min(1),
  shippingAddress: z.object({
    name: z.string().min(1),
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1),
  }),
  guestEmail: z.string().email().optional(),
  paymentIntent: z.string().optional(),
});

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: { select: { name: true, images: true, slug: true } },
            size: { select: { label: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch orders";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { items, shippingAddress, guestEmail, paymentIntent } = parsed.data;

  // Require either a logged-in user or a guest email
  if (!session?.user?.id && !guestEmail) {
    return NextResponse.json(
      { error: "An email address is required to place an order." },
      { status: 400 }
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id ?? null,
        guestEmail: session?.user?.id ? null : guestEmail,
        total,
        shippingAddress,
        paymentIntent,
        items: {
          create: items.map((item) => ({
            productId: item.productId ?? null,
            sizeId: item.sizeId ?? null,
            sizeLabel: item.sizeLabel ?? null,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: { select: { name: true, images: true, slug: true } },
            size: { select: { label: true } },
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
