"use server";
import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const customers = await stripe.customers.list();
    return new NextResponse(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    console.log("Error getting subscriptions ", error);
  }
}
