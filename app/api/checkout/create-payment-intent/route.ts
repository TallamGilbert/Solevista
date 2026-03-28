import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    // Return a mock response so the UI can render in development
    return NextResponse.json(
      { clientSecret: null, mock: true },
      { status: 200 }
    );
  }

  try {
    const { amount } = (await req.json()) as { amount: number };

    const stripe = new Stripe(secretKey, { apiVersion: "2024-11-20.acacia" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars → cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment setup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
