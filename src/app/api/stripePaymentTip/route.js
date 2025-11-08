import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { tipAmount } = await request.json();

    // Check range of tip
    if (tipAmount < 1 || tipAmount > 15) {
      const error = new Error("Invalid tip option. Tip must be between $1 and $15.");
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const response = await fetch("https://nextfaxapi-dlreibwmnq-uc.a.run.app/stripePaymentTip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tipAmount }),
    });

    if (!response.ok) {
      const error = new Error("Failed to fetch client secret from Firebase Functions");
      throw error;
    }

    const data = await response.json();

    return NextResponse.json({ clientSecret: data.clientSecret });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
