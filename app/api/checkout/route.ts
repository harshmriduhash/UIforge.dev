import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const getStripe = () => {

  const key = process.env.STRIPE_SECRET_KEY || "";
  return new Stripe(key, {
    apiVersion: "2024-06-20",
  });
};

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing");
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      customer_email: session.user?.email || undefined,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
