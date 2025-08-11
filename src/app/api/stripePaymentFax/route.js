import { NextResponse } from "next/server";
import { startSentryTransaction, captureApiError, logApiSuccess } from "@/utils/sentry";

export async function POST(request) {
  const transaction = startSentryTransaction("Create Stripe Payment", "payment");
  
  try {
    const response = await fetch("https://nextfaxapi-dlreibwmnq-uc.a.run.app/stripePaymentFax", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("Failed to fetch client secret from Firebase Functions");
      captureApiError(error, "stripePaymentFax", { status: response.status });
      throw error;
    }

    const data = await response.json();
    logApiSuccess(data, "stripePaymentFax");

    transaction.finish();
    return NextResponse.json({ clientSecret: data.clientSecret });
  } catch (error) {
    console.error("Error processing request:", error);
    captureApiError(error, "stripePaymentFax");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
