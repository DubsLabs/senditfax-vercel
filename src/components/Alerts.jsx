"use client";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";

import useAlertStore from "../store/useAlertStore";

export default function Alerts() {
  const [alerts, hideAlert] = useAlertStore((state) => [state.alerts, state.hideAlert]);

  return (
    <div
      className="w-4/5 max-w-[600px] fixed -translate-x-2/4 z-[9999] flex items-center justify-center flex-col left-2/4 bottom-12"
      role="region"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Notifications"
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        {alerts.map((alert) => (
          <Collapse key={alert.id} in={alert.visible} timeout={{ enter: 500, exit: 500 }}>
            <Alert
              variant="filled"
              severity={alert.type}
              sx={{ whiteSpace: "pre-line" }}
              role="alert"
              aria-live={alert.type === "error" ? "assertive" : "polite"}
              action={
                <IconButton
                  aria-label={`Close ${alert.type} notification`}
                  color="inherit"
                  size="small"
                  onClick={() => hideAlert(alert.id)}
                >
                  <MdClose fontSize="inherit" aria-hidden="true" />
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
