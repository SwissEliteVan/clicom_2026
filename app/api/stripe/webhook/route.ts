import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// On initialise Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2024-04-10" as Stripe.StripeConfig["apiVersion"],
});

// On initialise Supabase en mode admin (service_role) car c'est un webhook système
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy_key"
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Erreur de signature Webhook:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Traitement des événements d'abonnement
  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    try {
      // On cherche d'abord le client correspondant dans Supabase
      const { data: client, error: clientError } = await supabaseAdmin
        .from("clients")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (clientError || !client) {
        throw new Error("Client introuvable pour ce stripe_customer_id");
      }

      const planName = subscription.items.data[0]?.price.nickname || "Plan Inconnu";
      const amount = subscription.items.data[0]?.price.unit_amount 
        ? subscription.items.data[0].price.unit_amount / 100 
        : 0;

      // Upsert dans la table subscriptions
      const { error: upsertError } = await supabaseAdmin
        .from("subscriptions")
        .upsert({
          client_id: client.id,
          stripe_subscription_id: subscription.id,
          plan: planName,
          amount_monthly_chf: amount,
          status: subscription.status,
          current_period_end: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
        }, { onConflict: 'stripe_subscription_id' });

      if (upsertError) {
        throw upsertError;
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Erreur DB Webhook:", err.message);
      return new NextResponse(`DB Error: ${err.message}`, { status: 500 });
    }
  }

  return new NextResponse("Webhook reçu", { status: 200 });
}
