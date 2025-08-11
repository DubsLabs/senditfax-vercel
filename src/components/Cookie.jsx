"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Cookies from "js-cookie";

export default function Cookie() {
  // Hide banner initially to prevent hydration flicker
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check for cookie consent after component mount
    const hasConsent = Cookies.get("cookieConsent") === "true";

    // Show banner only if consent is not given
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleCookieConsent = () => {
    // Save consent in cookies
    Cookies.set("cookieConsent", "true", { path: "/" });
    setShowBanner(false);
  };

  // Show component only when showBanner is true
  if (!showBanner) {
    return null;
  }

  return (
    showBanner && (
      <div className="w-full max-w-[800px] fixed flex justify-center items-center z-[9999] -translate-x-2/4 left-2/4 bottom-14">
        <div className="shadow-[rgba(0,0,0,0.24)_0px_3px_8px] w-[1400px] bg-[white] p-[25px] rounded-[20px] shadow-custom">
          <div className="flex items-center justify-between gap-8">
            <div className="w-4/5 flex flex-col gap-2.">
              <h4 className="text-base font-semibold">This website uses cookies</h4>
              <p className="text-justify mb-2.5 text-sm">
                We use cookies to improve your experience and ensure the proper functioning of our fax sending service. By continuing to use our site,
                you agree to the collection of data such as sender and receiver details (name, company, contact information) and attached files for
                fax processing.
              </p>
              <Link className="flex items-center font-semibold text-[#1878f3]" href="/privacy">
                Show details <MdKeyboardArrowRight className="text-[black] text-xl" />
              </Link>
            </div>
            <button onClick={handleCookieConsent} className="cursor-pointer w-[200px] h-[50px] bg-[#1878f3] text-[white] rounded-[5px] border-[none]">
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
}
