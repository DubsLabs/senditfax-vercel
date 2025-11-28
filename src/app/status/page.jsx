"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../images/logo.png";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";

export default function StatusPage() {
  const router = useRouter();
  const [faxId, setFaxId] = useState("");
  const [error, setError] = useState("");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Check Fax Status", href: "/status" }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fax ID
    const trimmedId = faxId.trim();
    
    if (!trimmedId) {
      setError("Please enter a Fax ID");
      return;
    }

    // Basic validation - check if it looks like a valid ID
    if (trimmedId.length < 15) {
      setError("Fax ID seems too short. Please check and try again.");
      return;
    }
    
    // Check if contains only alphanumeric characters
    if (!/^[a-zA-Z0-9]+$/.test(trimmedId)) {
      setError("Fax ID should contain only letters and numbers.");
      return;
    }

    // Redirect to status page
    router.push(`/status/${trimmedId}`);
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <section className="max-w-2xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Check Fax Status", href: "/status" }]} />
      
      <div className="mb-8 flex flex-col items-center w-full gap-4">
        <Link href="/">
          <Image src={Logo} alt="SendItFax Logo" width={192} height={60} priority={true} className="w-48 md:w-64" />
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Check Your Fax Status</h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your Fax ID to track the delivery status of your fax
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <TextField
              fullWidth
              label="Fax ID"
              variant="outlined"
              value={faxId}
              onChange={(e) => {
                setFaxId(e.target.value);
                setError("");
              }}
              error={!!error}
              helperText={error || "Enter the Fax ID you received via email"}
              placeholder="e.g., Ybwno9HIsHD28qIO0qQA"
              autoFocus
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                },
              }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: "#1878F3",
              color: "white",
              fontWeight: 600,
              fontSize: "16px",
              padding: "12px",
              "&:hover": {
                backgroundColor: "#1565C0",
              },
            }}
          >
            Check Status
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">How to find your Fax ID:</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>Check the email you received after sending your fax</li>
            <li>The Fax ID is included in the subject line and body of the email</li>
            <li>It typically looks like: <code className="bg-gray-100 px-2 py-1 rounded text-xs">Ybwno9HIsHD28qIO0qQA</code></li>
            <li>Copy and paste the entire ID (20 characters) into the field above</li>
          </ul>
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-blue-800">
            <strong>Don't have a Fax ID?</strong> You need to{" "}
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              send a fax first
            </Link>{" "}
            to receive a tracking ID via email.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link 
            href="/faq"
            className="text-blue-600 hover:underline font-medium"
          >
            Visit FAQ
          </Link>
          <span className="text-gray-400">|</span>
          <Link 
            href="/how-to-send-fax-online"
            className="text-blue-600 hover:underline font-medium"
          >
            How to Send Fax
          </Link>
          <span className="text-gray-400">|</span>
          <Link 
            href="/"
            className="text-blue-600 hover:underline font-medium"
          >
            Send a New Fax
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
