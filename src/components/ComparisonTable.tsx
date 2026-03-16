"use client";

import { useState } from "react";

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
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star <= Math.ceil(rating) && rating % 1 >= 0.3;
        return (
          <svg
            key={star}
            className={`w-4 h-4 ${filled ? "text-amber-400" : half ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#e5e7eb" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${star})`}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </>
            ) : (
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            )}
          </svg>
        );
      })}
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
          <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md">
            #1 Our Pick
          </span>
        </div>
      )}

      {/* Badge */}
      {product.badge && !isWinner && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-gray-800 text-white text-xs font-semibold">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image area */}
      <div className="flex items-center justify-center h-44 sm:h-52 bg-gradient-to-b from-gray-50 to-white rounded-t-2xl pt-4">
        <span className="text-6xl sm:text-7xl">{product.image}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Best For tag */}
        <span className="inline-flex self-start items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Best for: {product.bestFor}
        </span>

        {/* Name */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
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
              <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
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
                {pro}
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
              <li key={con} className="flex items-start gap-2 text-sm text-gray-500">
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
                {con}
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
          rel="noopener noreferrer nofollow"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isWinner
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-200"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.045 18.02c.07-.116.36-.37.782-.628.422-.26 1.06-.614 1.76-.866 1.398-.506 3.12-.782 3.12-.782s-.04-.2-.06-.32c-.02-.12-.03-.19-.05-.32-.02-.13-.04-.26-.05-.39a9.2 9.2 0 01.04-1.565c.07-.51.17-.96.3-1.39.26-.87.6-1.56.97-2.15.37-.59.78-1.07 1.18-1.49.4-.42.79-.78 1.14-1.08.35-.3.65-.55.9-.74.25-.2.43-.34.56-.42l.16-.11c.12-.08.18-.12.18-.12s-.07.05-.2.17c-.13.12-.32.31-.57.57-.24.26-.54.6-.86 1.02-.32.42-.66.92-1 1.52-.34.6-.65 1.3-.9 2.06-.12.38-.23.77-.32 1.17-.09.4-.16.81-.2 1.23a9.06 9.06 0 00.04 1.57c.03.2.07.36.1.56.03.19.08.38.13.56.2-.06.43-.16.7-.27.28-.12.59-.26.93-.4.34-.14.72-.3 1.12-.44.41-.15.84-.29 1.28-.41.44-.12.9-.22 1.35-.29.46-.06.92-.1 1.37-.1.45 0 .9.04 1.33.13.42.1.83.24 1.2.46.37.22.7.52.96.89.26.38.44.83.52 1.34.04.26.06.52.05.78-.01.26-.04.51-.09.76-.1.5-.28.98-.5 1.42-.44.88-1.02 1.63-1.68 2.24-.66.6-1.41 1.07-2.18 1.4-.77.33-1.56.53-2.34.62-.39.05-.78.07-1.15.07-.38 0-.74-.03-1.09-.08a6.24 6.24 0 01-.96-.23c-.3-.1-.58-.23-.84-.38a4.7 4.7 0 01-.97-.77c-.36-.36-.69-.8-.96-1.33-.27-.52-.49-1.12-.62-1.78 0 0-.87.3-1.8.77-.93.47-1.93 1.12-2.58 1.88-.02.02-.05.05-.08.08-.02.04-.05.07-.07.11-.03.04-.05.08-.07.12l-.03.05c-.02.03-.03.04-.04.04v.02l-.01-.01c-.02-.06 0-.19.09-.39zm15.09.42c.52-.25 1-.57 1.43-.94.43-.37.82-.79 1.14-1.26.32-.47.56-.99.7-1.54.07-.27.12-.56.14-.85.02-.29 0-.58-.05-.86a2.2 2.2 0 00-.33-.82 1.98 1.98 0 00-.62-.61c-.49-.3-1.08-.43-1.67-.44-.59 0-1.19.1-1.76.27-.57.17-1.12.4-1.63.66-.51.26-.99.56-1.42.87-.43.31-.82.64-1.15.96l-.01.02c.08.42.2.82.36 1.18.16.37.35.71.58 1.01.23.3.49.56.78.77.29.21.6.38.93.49.34.11.69.17 1.06.17.37 0 .75-.06 1.14-.17l-.02.09z" />
          </svg>
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
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-orange-500 w-5" : "bg-gray-300"
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
            <p className="mt-3 text-gray-600 text-lg">{subtitle}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Last updated: March 2026
          </p>
        </div>

        {/* Desktop grid — all products visible */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {products.slice(0, 5).map((product, i) => (
            <ProductCard key={product.name} product={product} rank={i + 1} />
          ))}
        </div>

        {/* Tablet grid — 2 columns, limited to 4 */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-5">
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
        <div className="mt-12 overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
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
                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {i === 0 && (
                      <span className="inline-block w-5 h-5 mr-2 text-center rounded-full bg-orange-500 text-white text-xs leading-5 font-bold">
                        1
                      </span>
                    )}
                    {product.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-400 ml-1">/ 5</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                    {product.bestFor}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
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
