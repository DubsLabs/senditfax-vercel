import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Send formData to Firebase server
    const response = await fetch("https://nextfaxapi-dlreibwmnq-uc.a.run.app/sendFaxPaid", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = new Error(`Error: ${response.statusText}`);
      throw error;
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
