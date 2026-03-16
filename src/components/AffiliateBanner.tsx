"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "affiliate-banner-dismissed";

export default function AffiliateBanner() {
  const [dismissed, setDismissed] = useState(true); // default hidden to avoid flash

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  function handleDismiss() {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  }

  if (dismissed) return null;

  return (
    <div className="relative bg-amber-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 pr-10 text-center">
        <p className="text-xs sm:text-sm text-amber-800">
          We may earn a commission from links on this page, at no extra cost to
          you. As an Amazon Associate we earn from qualifying purchases.{" "}
          <Link
            href="/privacy-policy"
            className="underline font-medium hover:text-amber-950 transition-colors"
          >
            Learn more
          </Link>
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-amber-600 hover:text-amber-800 transition-colors"
        aria-label="Dismiss affiliate disclosure"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
