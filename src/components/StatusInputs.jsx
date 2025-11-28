"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import tipMarks from "@/utils/tipMarks";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

// Dynamic import for Stripe component (loaded only when tip drawer is opened)
const StripeRootTip = dynamic(() => import("@/components/StripeRootTip"), {
  ssr: false,
  loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Loading payment form...</div>,
});

export default function StatusInputs() {
  const [tipAmount, setTipAmount] = useState(8);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Slider
        aria-label="Tip Amount"
        defaultValue={8}
        valueLabelDisplay="auto"
        shiftStep={1}
        step={1}
        marks={tipMarks}
        min={1}
        max={15}
        onChange={(e, value) => setTipAmount(value)}
        sx={{
          color: "#1878F3",
        }}
      />

      <div className="flex justify-center w-full">
        <Button
          variant="outlined"
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          sx={{ color: "white", backgroundColor: "#1878F3", fontWeight: 600 }}
        >
          Leave a Tip
        </Button>
      </div>

      <Drawer
        anchor="right"
        size="md"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        aria-labelledby="tip-drawer-title"
        aria-modal="true"
      >
        <StripeRootTip setIsSidebarOpen={setIsSidebarOpen} tipAmount={tipAmount} />
      </Drawer>
    </>
  );
}
