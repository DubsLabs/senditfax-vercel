import React from "react";
import Link from "next/link";
import StatusInputs from "@/components/StatusInputs";
import StatusErrorHandler from "@/components/StatusErrorHandler";
import AdSense from "@/components/AdSense";
import StatusAutoRefresh from "@/components/StatusAutoRefresh";

export const generateMetadata = async ({ params }) => {
  const { faxId } = await params;
  return {
    title: `Status of Fax #${faxId} - SendItFax`,
    description:
      "Send free faxes to the U.S. and Canada without an account. Options for low-cost, high-priority faxing also available with SendItFax.",
    robots: { index: false, follow: false },
  };
};

export default async function Status({ params }) {
  const { faxId } = await params;
  // await new Promise((resolve) => setTimeout(resolve, 250)); // Loading skeleton for testing purposes

  let faxData;
  let errorMessage = null;
  try {
    const request = await fetch(`https://nextfaxapi-dlreibwmnq-uc.a.run.app/statusFax/${faxId}`, { cache: "no-store" });
    faxData = await request.json();

    if (request.status === 404) {
      console.log(`Fax with ID ${faxId} not found`);
      errorMessage = `Fax with ID ${faxId} not found`;
    }
  } catch (error) {
    faxData = null;
    errorMessage = "Error loading fax data";
  }

  const shouldShowAds = Boolean(faxData) && !errorMessage;

  // Function to get status badge color and icon
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Sent': { color: 'bg-green-100 text-green-800 border-green-300', icon: '✅', label: 'Sent Successfully' },
      'Queued': { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '⏳', label: 'Sending' },
      'Pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '⏳', label: 'Pending' },
      'SendingFailed': { color: 'bg-red-100 text-red-800 border-red-300', icon: '❌', label: 'Could Not Be Delivered' },
      'Failed': { color: 'bg-red-100 text-red-800 border-red-300', icon: '❌', label: 'Failed' },
      'Processing': { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: '🔄', label: 'Processing' },
    };
    return statusConfig[status] || { color: 'bg-gray-100 text-gray-800 border-gray-300', icon: '📄', label: status };
  };

  const statusBadge = getStatusBadge(faxData?.faxStatus);

  // Plain-English payment status. The backend places a hold at checkout and
  // only captures it once the fax is delivered.
  const getPaymentStatusDisplay = (status) => {
    const config = {
      'requires_capture': { color: 'text-yellow-700', label: 'On hold - charged only after delivery' },
      'captured': { color: 'text-green-600', label: 'Charged - fax delivered' },
      'succeeded': { color: 'text-green-600', label: 'Charged' },
      'canceled': { color: 'text-gray-700', label: 'Hold released - not charged' },
      'refunded': { color: 'text-gray-700', label: 'Refunded' },
    };
    return config[status] || { color: 'text-gray-700', label: status };
  };
  const paymentStatusDisplay = getPaymentStatusDisplay(faxData?.paymentStatus);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between gap-4 w-full max-w-7xl mx-auto">
      {/* Left ad - visible only on desktop. Avoid ads on error/empty pages */}
      {shouldShowAds && (
        <div className="hidden md:block md:w-64 lg:w-72 sticky top-4 self-start">
          <AdSense slotKey="statusLeft" format="vertical" style={{ minHeight: '600px', width: '100%' }} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow w-full">
        {errorMessage && <StatusErrorHandler error={errorMessage} />}
        <div className="w-full md:max-w-[700px] mx-auto flex flex-col items-center h-full p-4 md:p-6 gap-6">
          
          {/* Header with Status Badge */}
          <div className="w-full bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Fax Tracking</h1>
                <p className="text-sm text-gray-600 font-mono">ID: {faxId}</p>
              </div>
              <div className={`${statusBadge.color} px-6 py-3 rounded-lg font-semibold text-base border-2 flex items-center gap-2 shadow-sm`}>
                <span className="text-xl">{statusBadge.icon}</span>
                {statusBadge.label}
              </div>
            </div>
          </div>

          {/* While queued: explain what happens next and refresh automatically */}
          {!errorMessage && (
            <StatusAutoRefresh faxStatus={faxData?.faxStatus} faxType={faxData?.faxType} senderEmail={faxData?.senderEmail} />
          )}

          {/* Sender & Receiver Info */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sender */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-500">
                <span className="text-2xl">📤</span>
                <h3 className="text-lg font-semibold text-gray-800">Sender</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-600 w-24">Name:</span>
                  <span className="text-gray-800">{faxData?.senderName}</span>
                </div>
                {faxData?.senderCompany && (
                  <div className="flex">
                    <span className="font-medium text-gray-600 w-24">Company:</span>
                    <span className="text-gray-800">{faxData?.senderCompany}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="font-medium text-gray-600 w-24">Email:</span>
                  <span className="text-blue-600 break-all">{faxData?.senderEmail}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-600 w-24">Phone:</span>
                  <span className="text-gray-800">{faxData?.senderPhone}</span>
                </div>
              </div>
            </div>

            {/* Receiver */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-green-500">
                <span className="text-2xl">📥</span>
                <h3 className="text-lg font-semibold text-gray-800">Receiver</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-600 w-24">Name:</span>
                  <span className="text-gray-800">{faxData?.receiverName}</span>
                </div>
                {faxData?.receiverCompany && (
                  <div className="flex">
                    <span className="font-medium text-gray-600 w-24">Company:</span>
                    <span className="text-gray-800">{faxData?.receiverCompany}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="font-medium text-gray-600 w-24">Fax:</span>
                  <span className="text-gray-800 font-mono">{faxData?.receiverFax}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fax Details */}
          <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-purple-500">
              <span className="text-2xl">📋</span>
              <h3 className="text-lg font-semibold text-gray-800">Fax Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="font-medium text-gray-600 mb-1">Fax Type</span>
                <span className={`${faxData?.faxType === 'Paid' ? 'text-blue-600 font-semibold' : 'text-green-600 font-semibold'}`}>
                  {faxData?.faxType === 'Paid' ? '⚡ Priority' : '✅ Free'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-600 mb-1">Total Pages</span>
                <span className="text-gray-800 font-semibold">{faxData?.totalPages} pages</span>
              </div>
              {faxData?.paymentId && (
                <>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600 mb-1">Payment ID</span>
                    <span className="text-gray-800 font-mono text-xs break-all">{faxData?.paymentId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600 mb-1">Payment Status</span>
                    <span className={`${paymentStatusDisplay.color} font-semibold`}>{paymentStatusDisplay.label}</span>
                  </div>
                </>
              )}
              <div className="flex flex-col md:col-span-2">
                <span className="font-medium text-gray-600 mb-1">Created At</span>
                <span className="text-gray-800">{faxData?.localeDateTime}</span>
              </div>
            </div>
          </div>

          {/* Message/Cover Page */}
          <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-orange-500">
              <span className="text-2xl">📝</span>
              <h3 className="text-lg font-semibold text-gray-800">Cover Page Message</h3>
            </div>
            {faxData?.textArea ? (
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                {faxData.textArea
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .replace(/\s+/g, " ")
                  .trim()}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-200">
                No cover page included with this fax.
              </p>
            )}
          </div>

          {/* Tip Jar - Only show if fax was sent successfully */}
          {faxData?.faxStatus === "Sent" && (
            <div className="w-full bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-md border-2 border-yellow-400 p-6">
              <div className="text-center mb-4">
                <span className="text-4xl mb-2 block">☕</span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Enjoyed Our Service?</h3>
                <p className="text-sm text-gray-600">
                  Thank you for using SendItFax! If you found our service helpful, consider leaving a tip to support us.
                </p>
              </div>
              <StatusInputs />
            </div>
          )}

          {/* Quick Actions */}
          <div className="w-full flex flex-col sm:flex-row gap-3 mt-4">
            <Link 
              href="/" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors shadow-md"
            >
              📠 Send Another Fax
            </Link>
            <Link 
              href="/faq" 
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg text-center transition-colors border border-gray-300"
            >
              ❓ Need Help?
            </Link>
          </div>
        </div>
      </div>

      {/* Right ad - visible only on desktop. Avoid ads on error/empty pages */}
      {shouldShowAds && (
        <div className="hidden md:block md:w-64 lg:w-72 sticky top-4 self-start">
          <AdSense slotKey="statusRight" format="vertical" style={{ minHeight: '600px', width: '100%' }} />
        </div>
      )}
    </section>
  );
}
