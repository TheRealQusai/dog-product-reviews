"use client";

import { useState } from "react";
import Image from "next/image";

export interface ComparisonProduct {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  badge?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({
  product,
  rank,
}: {
  product: ComparisonProduct;
  rank: number;
}) {
  const isWinner = rank === 1;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 bg-white transition-shadow duration-200 ${
        isWinner
          ? "border-orange-400 shadow-lg shadow-orange-100"
          : "border-gray-100 hover:shadow-md"
      }`}
    >
      {/* Winner ribbon */}
      {isWinner && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md whitespace-nowrap">
            #1 Our Pick
          </span>
        </div>
      )}

      {/* Badge */}
      {product.badge && !isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-gray-800 text-white text-xs font-semibold whitespace-nowrap">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image area */}
      <div className="relative h-40 overflow-hidden rounded-t-2xl">
        {product.image.startsWith("/") ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-gray-50 to-white">
            <span className="text-5xl">{product.image}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Best For tag */}
        <span className="inline-flex self-start items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Best for: {product.bestFor}
        </span>

        {/* Name */}
        <h3 className="text-base font-bold text-gray-900 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={product.rating} />
          <span className="text-sm font-semibold text-gray-800">
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <p className="mt-3 text-2xl font-extrabold text-gray-900">
          {product.price}
        </p>

        {/* Divider */}
        <hr className="my-4 border-gray-100" />

        {/* Pros */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Pros
          </p>
          <ul className="space-y-1.5">
            {product.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                <svg
                  className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Cons
          </p>
          <ul className="space-y-1.5">
            {product.cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm text-gray-500 leading-snug">
                <svg
                  className="w-4 h-4 text-red-400 mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer to push CTA to bottom */}
        <div className="mt-auto" />

        {/* CTA */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isWinner
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-200"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          Check Price on Amazon
        </a>

        {/* Affiliate disclosure (tiny) */}
        <p className="mt-2 text-[10px] text-gray-400 text-center">
          Affiliate link — we may earn a commission
        </p>
      </div>
    </div>
  );
}

// ─── Mobile carousel nav ──────────────────────────────────────────
function MobileNav({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6 lg:hidden">
      <button
        onClick={() => onSelect(Math.max(0, current - 1))}
        disabled={current === 0}
        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous product"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "bg-orange-500 w-5" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to product ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => onSelect(Math.min(total - 1, current + 1))}
        disabled={current === total - 1}
        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next product"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────
export default function ComparisonTable({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: ComparisonProduct[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-gray-600 text-base sm:text-lg leading-relaxed">{subtitle}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Last updated: March 2026
          </p>
        </div>

        {/* Desktop grid — 3 columns max */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard key={product.name} product={product} rank={i + 1} />
          ))}
        </div>
        {/* Desktop second row if more than 3 */}
        {products.length > 3 && (
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-6">
            {products.slice(3, 5).map((product, i) => (
              <ProductCard key={product.name} product={product} rank={i + 4} />
            ))}
          </div>
        )}

        {/* Tablet grid — 2 columns */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-6">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.name} product={product} rank={i + 1} />
          ))}
        </div>

        {/* Mobile — single card with nav */}
        <div className="sm:hidden">
          <ProductCard
            product={products[activeIndex]}
            rank={activeIndex + 1}
          />
          <MobileNav
            total={products.length}
            current={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>

        {/* Quick comparison summary table */}
        <div className="mt-12 overflow-x-auto -mx-4 sm:mx-0 rounded-xl border border-gray-100">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4 font-semibold text-gray-600">Product</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Rating</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Price</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Best For</th>
                <th className="py-3 px-4 font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product, i) => (
                <tr
                  key={product.name}
                  className={`${i === 0 ? "bg-orange-50/50" : "bg-white"} hover:bg-gray-50 transition-colors`}
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {i === 0 && (
                        <span className="inline-flex shrink-0 items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs leading-5 font-bold">
                          1
                        </span>
                      )}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-400 ml-1">/ 5</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {product.bestFor}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow sponsored"
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      View Deal
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
