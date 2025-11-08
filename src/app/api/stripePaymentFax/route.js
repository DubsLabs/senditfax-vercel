import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = await fetch("https://nextfaxapi-dlreibwmnq-uc.a.run.app/stripePaymentFax", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
