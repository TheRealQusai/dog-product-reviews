"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-gray-900">PawPicks</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              Reviews
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              Comparisons
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              Buying Guides
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
              About
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            {["Reviews", "Comparisons", "Buying Guides", "About"].map((item) => (
              <Link
                key={item}
                href="#"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-orange-600"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
