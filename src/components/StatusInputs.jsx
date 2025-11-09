"use client";

import React, { useState } from "react";
import tipMarks from "@/utils/tipMarks";
import { Slider, Button, Drawer } from "@mui/material";
import StripeRootTip from "@/components/StripeRootTip";

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

      <Drawer anchor="right" size="md" open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <StripeRootTip setIsSidebarOpen={setIsSidebarOpen} tipAmount={tipAmount} />
      </Drawer>
    </>
  );
}
