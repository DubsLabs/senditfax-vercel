"use client";

import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeSidebarTip from "./StripeSidebarTip";
import useAlertStore from "@/store/useAlertStore";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripeRootTip({ setIsSidebarOpen, tipAmount }) {
  const [addError] = useAlertStore((state) => [state.addError]);
  const [clientSecret, setClientSecret] = useState(null);
  const isMounted = useRef(false);

  const handleLeaveTip = async () => {
    try {
      const response = await fetch("/api/stripePaymentTip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipAmount }),
      });

      const data = await response.json();
      if (response.ok) {
        setClientSecret(data.clientSecret);
        setIsSidebarOpen(true);
      } else {
        addError("Error Creating PaymentIntent.");
      }
    } catch (error) {
      addError("Error:", error);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      handleLeaveTip();
      isMounted.current = true;
    }
  }, []);

  return (
    clientSecret && (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#1976d2',
              colorBackground: '#ffffff',
              colorText: '#30313d',
              colorDanger: '#df1b41',
              fontFamily: 'system-ui, sans-serif',
              spacingUnit: '4px',
              borderRadius: '4px',
            },
          },
        }}
      >
        <StripeSidebarTip setIsSidebarOpen={setIsSidebarOpen} tipAmount={tipAmount} />
      </Elements>
    )
  );
}
