import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  reference: z.string().min(1),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid reference" }, { status: 422 });
  }

  const { reference } = parsed.data;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    // Mock mode — no Paystack key configured
    return NextResponse.json({ success: true, mock: true });
  }

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  if (!data.status || data.data?.status !== "success") {
    return NextResponse.json(
      { error: data.message ?? "Payment verification failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, data: data.data });
}
