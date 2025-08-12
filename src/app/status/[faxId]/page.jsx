import React from "react";
import StatusInputs from "@/components/StatusInputs";
import StatusErrorHandler from "@/components/StatusErrorHandler";
import AdSense from "@/components/AdSense";

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
    const request = await fetch(`https://nextfaxapi-dlreibwmnq-uc.a.run.app/statusFax/${faxId}`);
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

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-7xl mx-auto">
      {/* Left ad - visible only on desktop. Avoid ads on error/empty pages */}
      {shouldShowAds && (
        <div className="hidden md:block md:w-64 lg:w-72 sticky top-4 self-start">
          <AdSense slotKey="statusLeft" format="vertical" style={{ minHeight: '600px', width: '100%' }} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow">
        {errorMessage && <StatusErrorHandler error={errorMessage} />}
        <div className="w-full md:max-w-[600px] mx-auto flex flex-col items-center justify-between h-full p-6 gap-7 rounded-lg shadow-custom">
          <h2 className="text-2xl font-medium">Fax #{faxId}</h2>

          <div className="flex justify-between w-full py-2 rounded-lg shadow-custom">
            <div className="flex flex-col w-2/4 gap-2 px-3 border-solid border-r-[black] border-r">
              <h3 className="text-xl font-semibold text-center">Sender</h3>
              <p>
                <strong>Name:</strong> {faxData?.senderName}
              </p>
              <p>
                <strong>Company:</strong> {faxData?.senderCompany}
              </p>
              <p>
                <strong>Email:</strong> {faxData?.senderEmail}
              </p>
              <p>
                <strong>Phone:</strong> {faxData?.senderPhone}
              </p>
            </div>
            <div className="flex flex-col w-2/4 gap-2 px-3">
              <h3 className="text-xl font-semibold text-center">Receiver</h3>
              <p>
                <strong>Name:</strong> {faxData?.receiverName}
              </p>
              <p>
                <strong>Company:</strong> {faxData?.receiverCompany}
              </p>
              <p>
                <strong>Phone:</strong> {faxData?.receiverFax}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full gap-2 p-2 px-3 rounded-lg shadow-custom">
            <p>
              <strong>Fax Type:</strong> {faxData?.faxType}
            </p>
            <p>
              <strong>Fax Status:</strong> {faxData?.faxStatus}
            </p>
            <p>
              <strong>Payment Id:</strong> {faxData?.paymentId ? faxData?.paymentId : "Disabled for Free Faxes"}
            </p>
            <p>
              <strong>Payment Status:</strong> {faxData?.paymentStatus ? faxData?.paymentStatus : "Disabled for Free Faxes"}
            </p>
            <p>
              <strong>Total Pages:</strong> {faxData?.totalPages}
            </p>
            <p>
              <strong>Time of Creation:</strong> {faxData?.localeDateTime}
            </p>
          </div>

          {faxData?.textArea ? (
            <div className="flex flex-col justify-between w-full p-2 rounded-lg shadow-custom">
              <p>
                <strong>Message:</strong>{" "}
                {faxData.textArea
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .replace(/\s+/g, " ")
                  .trim()}
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between w-full p-2  rounded-lg shadow-custom">
              <p>
                <strong>Message: </strong>CoverPage is not included
              </p>
            </div>
          )}

          {faxData?.faxStatus === "Sent" && (
            <div className="flex flex-col justify-center w-full gap-3 p-2 px-4 rounded-lg shadow-custom">
              <div>
                <p className="font-semibold text-center">Tip Jar</p>

                <p className="text-center">Thank you for using our service! If you enjoyed it, feel free to leave a tip.</p>
              </div>

              <StatusInputs />
            </div>
          )}
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
