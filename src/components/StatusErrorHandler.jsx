"use client";

import { useEffect } from "react";
import useAlertStore from "@/store/useAlertStore";
import { useRouter } from "next/navigation";

export default function StatusErrorHandler({ error }) {
  const { addError } = useAlertStore();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      addError(error);

      const redirectTimer = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [error, addError, router]);

  return null;
}
