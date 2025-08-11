import { NextResponse } from "next/server";
import { startSentryTransaction, captureApiError, logFaxSuccess } from "@/utils/sentry";

export async function POST(request) {
  const transaction = startSentryTransaction("Send Free Fax", "sendFax");
  
  try {
    const formData = await request.formData();

    // Send formData to Firebase server
    const response = await fetch("https://nextfaxapi-dlreibwmnq-uc.a.run.app/sendFaxFree", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = new Error(`Error: ${response.statusText}`);
      captureApiError(error, "sendFaxFree", { status: response.status });
      throw error;
    }

    const data = await response.json();
    logFaxSuccess(data);

    transaction.finish();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    captureApiError(error, "sendFaxFree");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
