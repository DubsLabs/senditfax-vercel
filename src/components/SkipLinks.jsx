"use client";

import React from "react";
import Link from "next/link";

/**
 * Skip Links component for keyboard navigation accessibility
 * Allows users to skip to main content, navigation, or footer
 */
export default function SkipLinks() {
  return (
    <div className="skip-links">
      <Link
        href="#main-content"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </Link>
      <Link
        href="#footer"
        className="skip-link"
        aria-label="Skip to footer"
      >
        Skip to footer
      </Link>
      <style jsx>{`
        .skip-links {
          position: absolute;
          top: -100px;
          left: 0;
          z-index: 10000;
        }

        .skip-link {
          position: absolute;
          top: 0;
          left: 0;
          background: #1878f3;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          font-weight: 600;
          border-radius: 0 0 4px 0;
          transform: translateY(-100%);
          transition: transform 0.2s;
        }

        .skip-link:focus {
          transform: translateY(0);
          outline: 3px solid #fff;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

