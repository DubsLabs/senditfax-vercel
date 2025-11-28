"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { FaRegCheckCircle } from "react-icons/fa";
import useAlertStore from "../store/useAlertStore";

export default function StripeSidebarTip({ setIsSidebarOpen, tipAmount }) {
  const stripe = useStripe();
  const elements = useElements();

  const amount = tipAmount;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [addSuccess, addInfo, addError] = useAlertStore((state) => [state.addSuccess, state.addInfo, state.addError]);

  const handlePayment = async () => {
    if (isLoading || !stripe || !elements) return;
    setIsLoading(true);
    addInfo("Processing your payment, please wait...");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: `https://localhost:3005/status${PAYMENT_INTENT_ID}`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.log(error);
        let errorMessage = "Payment failed. Please try again.";

        if (error?.code === "card_declined") {
          switch (error?.decline_code) {
            case "generic_decline":
              errorMessage = "Your payment was declined. Please try a different card.";
              break;
            case "insufficient_funds":
              errorMessage = "Insufficient funds. Please use another payment method.";
              break;
            case "lost_card":
              errorMessage = "This card has been reported lost. Please use a different card.";
              break;
            case "stolen_card":
              errorMessage = "This card has been reported stolen. Please contact your bank.";
              break;
            case "card_velocity_exceeded":
              errorMessage = "Transaction limit exceeded. Please try again later.";
              break;
            default:
              errorMessage = "Your card was declined. Please try a different payment method.";
          }
        } else {
          switch (error?.code) {
            case "expired_card":
              errorMessage = "The card has expired. Please use another card.";
              break;
            case "incorrect_cvc":
              errorMessage = "The CVC code is incorrect. Please re-enter it.";
              break;
            case "processing_error":
              errorMessage = "A processing error occurred. Please try again later.";
              break;
            case "incorrect_number":
              errorMessage = "The card number is incorrect. Please re-enter the details.";
              break;
            default:
              errorMessage = "An unknown payment error occurred. Please try again.";
          }
        }

        addError(errorMessage);
        setIsLoading(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setIsLoading(false);
        setIsSuccessful(true);
        addSuccess(`Payment ${paymentIntent.id} has been successful\nThank you for your tip!`);

        setTimeout(() => {
          setIsSidebarOpen(false);
        }, 2500);
      }
    } catch (err) {
      console.log(err);
      addError("Unknown error while processing payment");
      setIsLoading(false);
    }
  };

  return (
    <div className="stripe-payment-block w-full min-w-[400px] max-w-[500px] flex flex-col gap-6 p-8 bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="text-center border-b-2 border-yellow-500 pb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">☕</span>
          <h2 className="text-2xl font-bold text-gray-800">Support Us</h2>
        </div>
        <p className="text-sm text-gray-600">Your tip helps us keep the service running smoothly</p>
      </div>

      {/* Only Show Dev Mode Instructions in Development */}
      {process.env.NODE_ENV === "development" && (
        <div className="flex flex-col items-center font-semibold stripe-dev-block bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
          <p className="text-yellow-800 mb-2">⚠️ DEV MODE INSTRUCTION!</p>
          <p className="text-sm text-yellow-700">Card Number (Regular) - 4242 4242 4242 4242</p>
          <p className="text-sm text-yellow-700">Card Number (3D Secure) - 4000 0027 6000 3184</p>
          <p className="text-sm text-yellow-700">Date and CVC - Any Valid Numbers</p>
        </div>
      )}

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Tip Amount</span>
          <span className="text-2xl font-bold text-yellow-600">${amount}</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">Thank you for your generosity! 🙏</p>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <PaymentElement className="w-full" />
      </div>
      <div className="stripe-block-buttons w-full flex flex-col items-center gap-3 mt-2">
        {!isLoading && !isSuccessful && (
          <Button
            onClick={handlePayment}
            variant="contained"
            type="button"
            sx={{
              height: "52px",
              fontSize: "16px",
              width: "100%",
              fontWeight: 600,
              backgroundColor: "#eab308",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(234, 179, 8, 0.3)",
              "&:hover": {
                backgroundColor: "#ca8a04",
                boxShadow: "0 6px 16px rgba(234, 179, 8, 0.4)",
              }
            }}
          >
            ☕ Send Tip ${amount}
          </Button>
        )}

        {isLoading && (
          <Button
            variant="contained"
            type="button"
            disabled
            sx={{
              height: "52px",
              fontSize: "16px",
              width: "100%",
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            <CircularProgress size={24} sx={{ color: "white" }} />
            <span className="ml-3">Processing...</span>
          </Button>
        )}

        {isSuccessful && (
          <Button
            variant="contained"
            type="button"
            endIcon={<FaRegCheckCircle size={20} />}
            sx={{
              backgroundColor: "#22c55e",
              height: "52px",
              fontSize: "16px",
              width: "100%",
              fontWeight: 600,
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
              "&:hover": {
                backgroundColor: "#22c55e",
              },
            }}
          >
            Thank You! 🙏
          </Button>
        )}

        <Button
          onClick={() => setIsSidebarOpen(false)}
          variant="outlined"
          type="button"
          sx={{
            color: "#DF1B41",
            borderColor: "#DF1B41",
            marginTop: "8px",
            height: "48px",
            fontSize: "15px",
            width: "100%",
            fontWeight: 600,
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "rgba(223, 27, 65, 0.05)",
              borderColor: "#DF1B41",
            },
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
