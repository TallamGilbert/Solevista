import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-paystack-signature");
  const rawBody = await req.text();

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  // Verify the request is from Paystack
  const hash = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as {
    event: string;
    data: { reference: string; status: string };
  };

  if (event.event === "charge.success") {
    const { reference } = event.data;
    await prisma.order.updateMany({
      where: { paymentIntent: reference },
      data: { status: "PAID" },
    });
  }

  return NextResponse.json({ received: true });
}
