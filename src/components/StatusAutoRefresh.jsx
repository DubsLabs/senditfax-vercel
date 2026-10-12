"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const REFRESH_MS = 30000;

// Shown on the tracking page while a fax is still queued. Re-renders the
// server page every 30s so the status updates without a manual reload.
export default function StatusAutoRefresh({ faxStatus, faxType, senderEmail }) {
  const router = useRouter();
  const isQueued = faxStatus === "Queued";

  useEffect(() => {
    if (!isQueued) return;
    const id = setInterval(() => router.refresh(), REFRESH_MS);
    return () => clearInterval(id);
  }, [isQueued, router]);

  if (!isQueued) return null;

  return (
    <div
      role="status"
      className="w-full bg-blue-50 border-2 border-blue-300 rounded-xl shadow-sm p-5 text-sm text-gray-800"
    >
      <p className="font-semibold text-blue-800 mb-2">⏳ We're sending your fax now</p>
      <p className="mb-2">
        This page checks for updates automatically. You'll also get an email
        {senderEmail ? <> at <span className="font-medium">{senderEmail}</span></> : null} as soon as the fax is
        delivered, or if it couldn't be sent, so you don't need to keep this page open.
      </p>
      {faxType === "Paid" && (
        <p className="text-gray-700">
          Your card has a temporary hold of $1.99 and is only charged once delivery is confirmed. If the fax
          can't be delivered, the hold is released and you won't be charged.
        </p>
      )}
    </div>
  );
}
