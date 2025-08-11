import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default async function Loading({ params }) {
  const skeletonWidths = {
    faxId: "45%",
    senderName: "47%",
    senderCompany: "43%",
    senderEmail: "60%",
    senderPhone: "65%",
    receiverName: "47%",
    receiverCompany: "62%",
    receiverFax: "49%",
    faxType: "65%",
    faxStatus: "54%",
    paymentId: "55%",
    paymentStatus: "48%",
    localeDateTime: "60%",
    textArea: "65%",
  };

  return (
    <section className="flex items-center justify-between rounded-lg shadow-custom">
      <div className="w-[600px] flex flex-col items-center justify-between h-full p-6 gap-7">
        <h2 className="text-2xl font-medium text-center w-full">
          Fax #<Skeleton width={skeletonWidths.faxId} style={{ display: "inline-block" }} />
        </h2>
        <div className="flex justify-between w-full py-2 rounded-lg shadow-custom">
          <div className="flex flex-col w-2/4 gap-2 px-3 border-solid border-r-[black] border-r">
            <h3 className="text-xl font-semibold text-center">Sender</h3>
            <p>
              <strong>Name:</strong> <Skeleton width={skeletonWidths.senderName} style={{ display: "inline-block" }} />
            </p>
            <p>
              <strong>Company:</strong> <Skeleton width={skeletonWidths.senderCompany} style={{ display: "inline-block" }} />
            </p>
            <p>
              <strong>Email:</strong> <Skeleton width={skeletonWidths.senderEmail} style={{ display: "inline-block" }} />
            </p>
            <p>
              <strong>Phone:</strong> <Skeleton width={skeletonWidths.senderPhone} style={{ display: "inline-block" }} />
            </p>
          </div>
          <div className="flex flex-col w-2/4 gap-2 px-3">
            <h3 className="text-xl font-semibold text-center">Receiver</h3>
            <p>
              <strong>Name:</strong> <Skeleton width={skeletonWidths.receiverName} style={{ display: "inline-block" }} />
            </p>
            <p>
              <strong>Company:</strong> <Skeleton width={skeletonWidths.receiverCompany} style={{ display: "inline-block" }} />
            </p>
            <p>
              <strong>Phone:</strong> <Skeleton width={skeletonWidths.receiverFax} style={{ display: "inline-block" }} />
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full gap-2 p-2 px-3 rounded-lg shadow-custom">
          <p>
            <strong>Fax Type:</strong> <Skeleton width={skeletonWidths.faxType} style={{ display: "inline-block" }} />
          </p>
          <p>
            <strong>Fax Status:</strong> <Skeleton width={skeletonWidths.faxStatus} style={{ display: "inline-block" }} />
          </p>
          <p>
            <strong>Payment Id:</strong> <Skeleton width={skeletonWidths.paymentId} style={{ display: "inline-block" }} />
          </p>
          <p>
            <strong>Payment Status:</strong> <Skeleton width={skeletonWidths.paymentStatus} style={{ display: "inline-block" }} />
          </p>
          <p>
            <strong>Time of Creation:</strong> <Skeleton width={skeletonWidths.localeDateTime} style={{ display: "inline-block" }} />
          </p>
        </div>
        <div className="flex flex-col justify-between w-full p-2 rounded-lg shadow-custom">
          <p>
            <strong>Message:</strong> <Skeleton width={skeletonWidths.textArea} style={{ display: "inline-block" }} />
          </p>
        </div>
      </div>
    </section>
  );
}
