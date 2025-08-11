"use client";

import { Alert, Stack, Collapse, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

import useAlertStore from "../store/useAlertStore";

export default function Alerts() {
  const [alerts, hideAlert] = useAlertStore((state) => [state.alerts, state.hideAlert]);

  return (
    <div className="w-4/5 max-w-[600px] fixed -translate-x-2/4 z-[9999] flex items-center justify-center flex-col left-2/4 bottom-12">
      <Stack sx={{ width: "100%" }} spacing={2}>
        {alerts.map((alert) => (
          <Collapse key={alert.id} in={alert.visible} timeout={{ enter: 500, exit: 500 }}>
            <Alert
              variant="filled"
              severity={alert.type}
              sx={{ whiteSpace: "pre-line" }}
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => hideAlert(alert.id)}>
                  <MdClose fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.message}
            </Alert>
          </Collapse>
        ))}
      </Stack>
    </div>
  );
}
