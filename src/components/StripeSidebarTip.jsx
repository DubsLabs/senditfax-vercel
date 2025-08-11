"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
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
    <div className="stripe-payment-block w-full min-w-[400px] flex flex-col items-center gap-6 p-8">
      {/* Only Show Dev Mode Instructions in Development */}
      {process.env.NODE_ENV === "development" && (
        <div className="flex flex-col items-center font-semibold stripe-dev-block">
          <p>DEV MODE INSTRUCTION!</p>
          <p>Card Number (Regular) - 4242 4242 4242 4242</p>
          <p>Card Number (3D Secure) - 4000 0027 6000 3184</p>
          <p>Date and CVC - Any Valid Numbers</p>
        </div>
      )}

      <div className="text-xl font-semibold">
        <p>Service: Tip Jar - ${amount}</p>
      </div>

      <PaymentElement className="w-full" />
      <div className="stripe-block-buttons w-full flex flex-col items-center gap-2.5">
        {!isLoading && !isSuccessful && (
          <Button
            onClick={handlePayment}
            variant="contained"
            type="button"
            sx={{
              height: "45px",
              fontSize: "16px",
              width: "100%",
              fontWeight: 600,
            }}
          >
            Pay ${amount}
          </Button>
        )}

        {isLoading && (
          <Button
            variant="contained"
            type="button"
            disabled
            sx={{
              height: "45px",
              fontSize: "16px",
              width: "100%",
              fontWeight: 600,
            }}
          >
            <CircularProgress size={24} />
          </Button>
        )}

        {isSuccessful && (
          <Button
            variant="contained"
            type="button"
            endIcon={<FaRegCheckCircle />}
            sx={{
              backgroundColor: "#30B130",
              height: "45px",
              fontSize: "16px",
              width: "100%",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#30B130",
              },
            }}
          >
            Payment successful
          </Button>
        )}

        <Button
          onClick={() => setIsSidebarOpen(false)}
          variant="text"
          type="button"
          sx={{
            color: "#DF1B41",
            marginTop: "14px",
            height: "45px",
            fontSize: "16px",
            width: "100%",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(223, 27, 65, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
